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

  totalElements = 0;
  pageIndex = 0;
  pageSize = 12;

  totalElementsAutores: number = 0;
  pageIndexAutores: number = 0;
  pageSizeAutores: number = 5;

  mensagemErro: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientesService: ClientesService,
    private autoresService: AutoresService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getClientes(this.pageIndex, this.pageSize);
    this.getAutores();
  }

  ngAfterViewInit(): void {
    this.clientesDataSource.paginator = this.paginator;
    this.clientesDataSource.sort = this.sort;
  }


  getClientes(page: number = 0, size: number = 12, filter: string = '') {
    const getClientesMethod = filter.trim()
      ? this.clientesService.getClientesByName(filter, page, size)
      : this.clientesService.getClientes(page, size);

    getClientesMethod.subscribe({
      next: (data) => {
        const clientes = data._embedded?.personVOList ?? [];

        this.clientesDataSource.data = clientes;
        this.clientesDataSource.paginator = this.paginator;
        this.clientesDataSource.sort = this.sort;

        if (data?.page) {
          this.totalElements = data.page.totalElements;
          this.pageIndex = data.page.number;

          if (this.paginator) {
            this.paginator.pageIndex = this.pageIndex;
            this.paginator.length = this.totalElements;
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
        this.getClientes(this.pageIndex, this.pageSize);
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
        this.getClientes(this.pageIndex, this.pageSize);
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
          this.getClientes(this.pageIndex, this.pageSize);
        },
        (error) => {
          this.mensagemErro = `Erro ao excluir o cliente com ID ${id}.`;
        }
      );
    }
  }

  getAutores() {
    const getAutoresMethod = this.autoresService.getAllAutores();
    getAutoresMethod.subscribe({
      next: (data) => {
        const autores = data ?? [];
        this.autoresDataSource.data = autores;
        this.autoresDataSource.paginator = this.paginator;
        this.autoresDataSource.sort = this.sort;

        if (data?.page) {
          this.totalElements = data.page.totalElements;
          this.pageIndex = data.page.number;

          if (this.paginator) {
            this.paginator.length = this.totalElements;
            this.paginator.pageIndex = this.pageIndex;
          }
        }
      },
      error: (error) => {
        console.error('Erro ao buscar autores:', error);
      }
    })
  }

  onPageChangedAuthors(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAutores();
  }
}
