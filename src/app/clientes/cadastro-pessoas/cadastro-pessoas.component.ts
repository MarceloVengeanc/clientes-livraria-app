import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from 'src/app/services/clientes.service';
import { Clientes } from './clientes';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.scss'],
})
export class CadastroPessoasComponent implements OnInit {
  cliente!: any;
  form: FormGroup;
  isChecked = false;

  gender = [
    { id: 1, value: 'Masculino', viewValue: 'Masculino' },
    { id: 2, value: 'Feminino', viewValue: 'Feminino' },
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CadastroPessoasComponent>,
    private clientesService: ClientesService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      endereco: ['', Validators.required],
      sexo: ['', Validators.required],
      author: [false]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.cliente) {
      this.cliente = this.data.cliente;
      const sexoSelecionado = this.gender.find(
        (g) => g.value === this.cliente.gender
      )?.value;

      this.form.patchValue({
        nome: this.cliente.firstName,
        sobrenome: this.cliente.lastName,
        sexo: sexoSelecionado,
        endereco: this.cliente.address,
        author: this.cliente.author ?? false
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const clienteData: Clientes = {
        id: this.cliente?.id,
        firstName: this.form.value.nome,
        lastName: this.form.value.sobrenome,
        gender: this.form.value.sexo,
        address: this.form.value.endereco,
        enabled: this.cliente?.enabled ?? true,
        author: this.form.get('author')?.value ?? false
      };

      if (this.cliente && this.cliente._links?.self?.href) {
        this.clientesService
          .atualizaCliente(this.cliente._links.self.href, clienteData).subscribe(
            (response) => {
              this.snackBar.open('Cadastro atualizado com sucesso!', 'Fechar', {
                duration: 3000
              });
              this.dialogRef.close(response);
            },
            (error) => {
              this.snackBar.open('Erro ao atualizar o cadastro!', 'Fechar', {
                duration: 3000
              });
            }
          );
      } else {
        this.clientesService.cadastrarCliente(clienteData).subscribe(
          (response) => {
            this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
              duration: 3000
            });
            this.dialogRef.close(response);
          },
          (error) => {
            this.snackBar.open('Erro ao cadastrar!', 'Fechar', {
              duration: 3000
            });
          }
        )
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  compararObjeto(o1: any, o2: any) {
    return o1 === o2;
  }

}
