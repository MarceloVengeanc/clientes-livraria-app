import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from './cadastro-pessoas/clientes';
import { ClientesService } from '../services/clientes.service';
import { MatSort } from '@angular/material/sort';
import { CadastroPessoasComponent } from './cadastro-pessoas/cadastro-pessoas.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Autores } from './cadastro-pessoas/autores';
import { AutoresService } from '../services/autores.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  displayedColumnsClientes: string[] = ['id', 'nome', 'sexo', 'endereco', 'acoes'];
  displayedColumnsAutores: string[] = ['id', 'nome', 'sexo', 'nacionalidade', 'acoes'];
  clientesDataSource = new MatTableDataSource<Clientes>();
  autoresDataSource = new MatTableDataSource<Autores>();

  carregando = false;

  totalElementsClientes = 0;
  pageIndexClientes = 0;
  pageSizeClientes = 12;

  totalElementsAutores: number = 0;
  pageIndexAutores: number = 0;
  pageSizeAutores: number = 5;

  mensagemErro: string | null = null;

  @ViewChild(MatPaginator) paginatorClientes!: MatPaginator;
  @ViewChild(MatSort) sortClientes!: MatSort;
  @ViewChild(MatPaginator) paginatorAutores!: MatPaginator;
  @ViewChild(MatSort) sortAutores!: MatSort;

  constructor(
    private clientesService: ClientesService,
    private autoresService: AutoresService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getClientes(this.pageIndexClientes, this.pageSizeClientes);
    this.getAutores();
    this.getAutoresTeste();
  }

  ngAfterViewInit(): void {
    this.clientesDataSource.paginator = this.paginatorClientes;
    this.clientesDataSource.sort = this.sortClientes;
    this.autoresDataSource.paginator = this.paginatorAutores;
    this.autoresDataSource.sort = this.sortAutores;
  }

  getAutoresTeste() {
    this.clientesService.getAutores(true).subscribe((data) => {
      console.log(data,'AQUI');
      this.autoresDataSource.data = data;

    });
  }

  getClientes(page: number = 0, size: number = 12, filter: string = '') {
    const getClientesMethod = filter.trim()
      ? this.clientesService.getClientesByName(filter, page, size)
      : this.clientesService.getClientes(page, size);

    getClientesMethod.subscribe({
      next: (data) => {
        const clientes = data._embedded?.personVOList ?? [];

        this.clientesDataSource.data = clientes;
        this.clientesDataSource.paginator = this.paginatorClientes;
        this.clientesDataSource.sort = this.sortClientes;

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
        console.error('Erro ao buscar clientes:', error);
      }
    });
  }

  onPageChange(event: any) {
    console.log('Page index:', event.pageIndex, 'Page size:', event.pageSize);
    this.getClientes(event.pageIndex, event.pageSize);
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.getClientes(0, 12, filterValue);
  }

  cadastrarClientes() {
    const dialogRef = this.dialog.open(CadastroPessoasComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getClientes(this.pageIndexClientes, this.pageSizeClientes);
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
        this.getClientes(this.pageIndexClientes, this.pageSizeClientes);
      }
    });
  }

  excluirCliente(id: number): void {
    if (confirm(`Tem certeza de que deseja excluir o cliente?`)) {
      this.clientesService.excluirCliente(id).subscribe(
        () => {
          this.snackBar.open('Cliente excluído com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.getClientes(this.pageIndexClientes, this.pageSizeClientes);
        },
        (error) => {
          this.mensagemErro = `Erro ao excluir o cliente com ID ${id}.`;
        }
      );
    }
  }

  getAutores(): void {
    const getAutoresMethod = this.autoresService.getAutores(this.pageIndexAutores, this.pageSizeAutores);
    getAutoresMethod.subscribe({
      next: (data) => {
        const autores = data.content ?? [];
        this.autoresDataSource.data = autores;
        this.autoresDataSource.paginator = this.paginatorAutores;
        this.autoresDataSource.sort = this.sortAutores;

        if (data?.page) {
          this.totalElementsAutores = data.totalElements;
          this.pageIndexAutores = data.number;

          if (this.paginatorAutores) {
            this.paginatorAutores.length = this.totalElementsAutores;
            this.paginatorAutores.pageIndex = this.pageIndexAutores;
          }
        }
      },
      error: (error) => {
        console.error('Erro ao buscar autores:', error);
      }
    });
  }

  getallAutores() {
    const getAutoresMethod = this.autoresService.getAllAutores();
    getAutoresMethod.subscribe({
      next: (data) => {
        const autores = data ?? [];
        this.autoresDataSource.data = autores;
        this.autoresDataSource.paginator = this.paginatorAutores;
        this.autoresDataSource.sort = this.sortAutores;

        if (data?.page) {
          this.totalElementsAutores = data.page.totalElements;
          this.pageIndexAutores = data.page.number;

          if (this.paginatorAutores) {
            this.paginatorAutores.length = this.totalElementsAutores;
            this.paginatorAutores.pageIndex = this.pageIndexAutores;
          }
        }
      },
      error: (error) => {
        console.error('Erro ao buscar autores:', error);
      }
    })
  }

  onPageChangedAuthors(event: any): void {
    this.pageIndexAutores = event.pageIndex;
    this.pageSizeAutores = event.pageSize;
    this.getAutores();
  }
}
