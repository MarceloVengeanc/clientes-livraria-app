import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clientes } from './clientes';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.scss']
})
export class CadastroClientesComponent implements OnInit {

  cliente!: Clientes;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CadastroClientesComponent>
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      endereco: ['', Validators.required],
      sexo: ['', Validators.required]
    });
  }
  gender = [
    { id: 1, value: 'Male', viewValue: 'Masculino' },
    { id: 2, value: 'Female', viewValue: 'Feminino' }
  ];


  ngOnInit(): void {
    if (this.data && this.data.cliente) {
      this.cliente = this.data.cliente;
      const sexoSelecionado = this.gender.find(g => g.value === this.cliente.gender)?.value;
      this.form.patchValue({
        nome: this.cliente.firstName,
        sobrenome: this.cliente.lastName,
        sexo: sexoSelecionado,
        endereco: this.cliente.address
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const clienteData: Clientes = this.form.value;
      if (this.cliente) {
        clienteData.id = this.cliente.id;
      }
      this.dialogRef.close(clienteData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }


}
