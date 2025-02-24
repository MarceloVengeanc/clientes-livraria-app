import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from '../cadastro-pessoas/clientes';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientesService } from 'src/app/services/clientes.service';
import { CadastroPessoasComponent } from '../cadastro-pessoas/cadastro-pessoas.component';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.scss']
})
export class AutoresComponent implements OnInit, AfterViewInit {

  displayedColumnsAutores: string[] = ['id', 'nome', 'sexo', 'endereco', 'acoes'];
  autoresDataSource = new MatTableDataSource<Clientes>();

  mensagemErro: string | null = null;

  totalElementsAutores: number = 0;
  pageIndexAutores: number = 0;
  pageSizeAutores: number = 5;

  @ViewChild(MatPaginator) paginatorAutores!: MatPaginator;
  @ViewChild(MatSort) sortAutores!: MatSort;

  constructor(
    private autoresService: ClientesService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
) {

  }

  ngOnInit(): void {
    this.getAutores();

  }

  ngAfterViewInit(): void {
    this.autoresDataSource.paginator = this.paginatorAutores;
    this.autoresDataSource.sort = this.sortAutores;
  }

  getAutores() {
    const getClientes = this.autoresService.getTotalAutores();

    getClientes.subscribe({
      next: (data) => {
        const autores = data;

        this.autoresDataSource.data = autores;
        this.autoresDataSource.paginator = this.paginatorAutores;
        this.autoresDataSource.sort = this.sortAutores;
      },
      error: (error) => {
        console.error('Erro ao buscar cadastros:', error);
      }
    })
  }

  editarAutor(clientes: Clientes) {
      const dialogRef = this.dialog.open(CadastroPessoasComponent, {
        width: '600px',
        data: { cliente: clientes }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getAutores();
        }
      });
    }

    inativarAutor(id: number): void {
      if (confirm(`Deseja realmente inativar o cadastro?`)) {
        this.autoresService.excluirCliente(id).subscribe(
          () => {
            this.snackBar.open('Cadastro excluído com sucesso!', 'Fechar', {
              duration: 3000
            });
            this.getAutores();
          },
          (error) => {
            this.mensagemErro = `Erro ao excluir o Cadastro com ID ${id}.`;
          }
        );
      }
    }

  onPageChangedAuthors(event: any): void {
    this.pageIndexAutores = event.pageIndex;
    this.pageSizeAutores = event.pageSize;
    this.getAutores();
  }
}
