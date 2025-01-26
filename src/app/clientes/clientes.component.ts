import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from './cadastro-clientes/clientes';
import { ClientesService } from '../services/clientes.service';
import { MatSort } from '@angular/material/sort';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nome', 'sexo', 'endereco', 'acoes'];
  dataSource = new MatTableDataSource<Clientes>();

  carregando = false;

  totalElements: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  mensagemErro: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const href = this.route.snapshot.queryParamMap.get('href')
    this.getClientes(this.pageIndex, this.pageSize);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getClientes(page: number, size: number): void {
    this.clientesService.getClientes(page, size).subscribe({
      next: (data) => {
        this.dataSource.data = data?._embedded?.personVOList ?? [];
        console.log(this.dataSource.data,'vem co pai')
        if (data?.page) {
          this.totalElements = data.page.totalElements;
          this.pageSize = data.page.size;
          this.pageIndex = data.page.number;

          if (this.paginator) {
            this.paginator.length = this.totalElements;
          }
        }
      },
      error: (error) => {
        console.error('Erro ao buscar clientes:', error);
      }
    });
  }

  onPageChanged(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getClientes(this.pageIndex, this.pageSize);
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cadastrarClientes() {
    const dialogRef = this.dialog.open(CadastroClientesComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getClientes(this.pageIndex, this.pageSize);
      }
    });
  }

  editarClientes(clientes: Clientes) {
    const dialogRef = this.dialog.open(CadastroClientesComponent, {
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
}
