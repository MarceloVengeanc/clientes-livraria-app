import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from './cadastro-clientes/clientes';
import { ClientesService } from '../services/clientes.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nome', 'sexo', 'endereco', 'acoes'];
  dataSource = new MatTableDataSource<Clientes>();

  totalElements: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
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

  excluirPessoa(id: number) {
    this.dataSource.data = this.dataSource.data.filter(pessoa => pessoa.id !== id);
  }
}
