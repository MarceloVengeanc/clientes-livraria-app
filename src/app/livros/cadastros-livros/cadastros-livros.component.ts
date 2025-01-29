import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Livros } from '../livros';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AutoresService } from 'src/app/services/autores.service';
import { Autores } from 'src/app/clientes/cadastro-pessoas/autores';

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
  autoresDataSource: MatTableDataSource<Autores> = new MatTableDataSource();
  autorFiltrado: string[] = [];

  constructor(
    private autoresService: AutoresService,
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

    this.getallAutores();

    this.autoresDataSource.filter = '';
    this.filtro.valueChanges.subscribe(value => {
      this.autoresDataSource.filter = (value ?? '').trim().toLowerCase();
      this.autorFiltrado = this.autoresDataSource.filteredData.map(item => item.name);
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

  getallAutores() {
    const getAutoresMethod = this.autoresService.getAllAutores();
    getAutoresMethod.subscribe({
      next: (data) => {
        const autores = data ?? [];
        console.log(autores, 'autores')
        this.autoresDataSource.data = autores;
        this.autorFiltrado = autores.map((item: Autores) => item.name);
      },
      error: (error) => {
        console.error('Erro ao buscar autores:', error);
      }
    })
  }
}
