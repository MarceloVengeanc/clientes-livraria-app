import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from './cadastro-clientes/clientes';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
  displayedColumns: string[] = ['id', 'nome', 'idade', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Clientes>([]);
  errorMessage: string | null = null;

  constructor(private clientesService: ClientesService){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getClientes();
  }

  getClientes(): void {
    this.clientesService.getAllClientes().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  // getClientes(page: number = 0, size: number = 12, direction: string = 'asc'): void {
  //   this.clientesService.getClientes(page, size, direction).subscribe({
  //     next: (response) => {
  //       console.log(response)
  //       const clientes = response._embedded.content;
  //       this.dataSource.data = clientes;

  //       this.paginator.length = response.page.totalElements;
  //     },
  //     error: (err) => {
  //       console.error('Erro ao carregar os clientes:', err);
  //     }
  //   });
  // }

    aplicarFiltro(event: Event) {
      const valor = (event.target as HTMLInputElement).value;
      this.dataSource.filter = valor.trim().toLowerCase();
    }

    excluirPessoa(id: number) {
      this.dataSource.data = this.dataSource.data.filter(pessoa => pessoa.id !== id);
    }

}
