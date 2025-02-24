import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from './cadastro-pessoas/clientes';
import { ClientesService } from '../services/clientes.service';
import { MatSort } from '@angular/material/sort';
import { CadastroPessoasComponent } from './cadastro-pessoas/cadastro-pessoas.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pessoas',
  templateUrl: './totalPessoas.component.html',
  styleUrls: ['./totalPessoas.component.scss']
})
export class totalPessoasComponent implements OnInit, AfterViewInit {

  displayedColumnsClientes: string[] = ['id', 'nome', 'sexo', 'endereco', 'acoes'];
  pessoasDataSource = new MatTableDataSource<Clientes>();

  carregando = false;

  totalElementsClientes = 0;
  pageIndexClientes = 0;
  pageSizeClientes = 12;

  mensagemErro: string | null = null;

  @ViewChild(MatPaginator) paginatorClientes!: MatPaginator;
  @ViewChild(MatSort) sortClientes!: MatSort;


  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPessoas();
  }

  ngAfterViewInit(): void {
    this.pessoasDataSource.paginator = this.paginatorClientes;
    this.pessoasDataSource.sort = this.sortClientes;
  }

  getPessoas() {
    const getClientes = this.clientesService.getTotalPessoas();

    getClientes.subscribe({
      next: (data) => {
        const pessoas = data;

        this.pessoasDataSource.data = pessoas;
        this.pessoasDataSource.paginator = this.paginatorClientes;
        this.pessoasDataSource.sort = this.sortClientes;
      },
      error: (error) => {
        console.error('Erro ao buscar cadastros:', error);
      }
    })
  }


  getClientesPaginado(page: number = 0, size: number = 12, filter: string = '') {
    const getClientesMethod = filter.trim()
      ? this.clientesService.getClientesByName(filter, page, size)
      : this.clientesService.getClientes(page, size);

    getClientesMethod.subscribe({
      next: (data) => {
        const clientes = data._embedded?.personVOList ?? [];

        this.pessoasDataSource.data = clientes;
        this.pessoasDataSource.paginator = this.paginatorClientes;
        this.pessoasDataSource.sort = this.sortClientes;

        if (data?.page) {
          this.totalElementsClientes = data.page.totalElements;
          this.pageIndexClientes = data.page.number;

          if (this.paginatorClientes) {
            this.paginatorClientes.pageIndex = this.pageIndexClientes;
            this.paginatorClientes.length = this.totalElementsClientes;
          }
        }
      },
      error: (error) => {
        console.error('Erro ao buscar cadastros:', error);
      }
    });
  }

  onPageChange(event: any) {
    console.log('Page index:', event.pageIndex, 'Page size:', event.pageSize);
    this.getPessoas();
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pessoasDataSource.filter = filterValue.trim().toLowerCase();
  }

  cadastrarClientes() {
    const dialogRef = this.dialog.open(CadastroPessoasComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPessoas();
      }
    });
  }

  editarClientes(clientes: Clientes) {
    const dialogRef = this.dialog.open(CadastroPessoasComponent, {
      width: '600px',
      data: { cliente: clientes }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPessoas();
      }
    });
  }

  excluirCliente(id: number): void {
    if (confirm(`Deseja realmente inativar o cadastro?`)) {
      this.clientesService.excluirCliente(id).subscribe(
        () => {
          this.snackBar.open('Cadastro excluído com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.getPessoas();
        },
        (error) => {
          this.mensagemErro = `Erro ao excluir o Cadastro com ID ${id}.`;
        }
      );
    }
  }

}
