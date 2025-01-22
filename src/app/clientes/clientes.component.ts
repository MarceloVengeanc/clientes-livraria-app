import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from './cadastro-clientes/clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
  displayedColumns: string[] = ['id', 'nome', 'idade', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Clientes>([
    { id: 1, firstName: 'Carlos', lastName: 'silva', address: 'rua um',gender: 'Masculino', enabled: true },
    { id: 2, firstName: 'Maria', lastName: 'souza', address: 'rua dois',gender: 'Feminino', enabled: true },
    { id: 3, firstName: 'João', lastName: 'josé', address: 'rua tres',gender: 'Masculino', enabled: true },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  aplicarFiltro(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  excluirPessoa(id: number) {
    this.dataSource.data = this.dataSource.data.filter(pessoa => pessoa.id !== id);
  }
}
