import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Livros } from '../livros';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cadastro-livros',
  templateUrl: './cadastros-livros.component.html',
  styleUrls: ['./cadastros-livros.component.scss']
})
export class CadastrosLivrosComponent implements OnInit {

  autorSelecionado: string = '';
  form: FormGroup;
  livro!: Livros;
  filtro = new FormControl('');
  autorFiltrado: string[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CadastrosLivrosComponent>
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      preco: ['', Validators.required],
      dataLancamento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.livro) {
      this.livro = this.data.livro;
      this.form.patchValue({
        titulo: this.livro.title,
        autor: this.livro.author,
        preco: this.livro.price,
        dataLancamento: this.livro.launchDate ? new Date(this.livro.launchDate) : null
      });
    }


    this.filtro.valueChanges.subscribe(value => {
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const livroData: Livros = this.form.value;
      if (this.livro) {
        livroData.id = this.livro.id;
      }
      this.dialogRef.close(livroData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
