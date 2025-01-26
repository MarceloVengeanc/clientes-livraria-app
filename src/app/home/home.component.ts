import { Component, OnInit } from '@angular/core';
import { LivrosService } from '../services/livros.service';
import { MatTableDataSource } from '@angular/material/table';
import { Livros } from '../livros/livros';
import { ClientesService } from '../services/clientes.service';
import { Clientes } from '../clientes/cadastro-clientes/clientes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataSourceLivro = new MatTableDataSource<Livros>();
  dataSourceCliente = new MatTableDataSource<Clientes>();
  totalClientes: number = 0;
  totalLivros: number = 0;
  vendas: number = 0;
  emprestimos: number = 0;
  emprestimosAtraso: number = 0;
  emprestimosvencendo: number = 0;

  clientesHoje: number = 0;
  livrosHoje: number = 0;
  vendasHoje: number = 0;
  EmprestimosHoje: number = 0;
  TotalDevolucoesAtraso: number = 0;
  venceHoje: number = 0;

  constructor(
    private livrosService: LivrosService,
    private clientesService: ClientesService
  ) { }

  ngOnInit(): void {
    this.getTotalLivros();
    this.getTotalClientes();
  }

  getTotalLivros(): void {
    this.livrosService.getTotalLivros().subscribe({
      next: (data) => {
        this.dataSourceLivro.data = data?._embedded?.bookVOList ?? [];
        if (data?.page) {
          this.totalLivros = data.page.totalElements;
        }
      },
      error: (error) => {
        console.error('Erro ao buscar livros:', error);
      }
    });
  }

  getTotalClientes(): void {
    this.clientesService.getTotalClientes().subscribe({
      next: (data) => {
        console.log(data)
        this.dataSourceCliente.data = data?._embedded?.persorVOList ?? [];
        if (data?.page) {
          this.totalClientes = data.page.totalElements;
        }
      },
      error: (error) => {
        console.error('Erro ao buscar livros:', error);
      }
    });
  }

}
