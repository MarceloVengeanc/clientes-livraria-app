import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from 'src/app/clientes/cadastro-clientes/clientes';
import { Livros } from 'src/app/livros/livros';
import { ClientesService } from 'src/app/services/clientes.service';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-detalhado',
  templateUrl: './detalhado.component.html',
  styleUrls: ['./detalhado.component.scss']
})
export class DetalhadoComponent implements AfterViewInit, OnInit {
  dataSourceLivro = new MatTableDataSource<Livros>();
  dataSourceCliente = new MatTableDataSource<Clientes>();
  totalClientes: number = 0;
  totalLivros: number = 0;
  vendas: number = 0;
  emprestimos: number = 0;
  emprestimosAtraso: number = 0;
  emprestimosvencendo: number = 0;

  clientesAtivos: any;
  livrosHoje: number = 0;
  vendasHoje: number = 0;
  EmprestimosHoje: number = 0;
  TotalDevolucoesAtraso: number = 0;
  venceHoje: number = 0;
  totalEnabled: any;

  carregando = true;
  dadosCarregados = false;

  constructor(
    private livrosService: LivrosService,
    private clientesService: ClientesService
  ) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getTotalLivros(),
      this.getTotalClientes(),
      this.getAllClientes()
    ]).finally(() => {
      this.dadosCarregados = true;
      this.carregando = false;
    });
  }

  ngAfterViewInit(): void {}

  getTotalClientes(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.clientesService.getTotalClientes().subscribe({
        next: (data) => {
          console.log(data);
          this.dataSourceCliente.data = data?._embedded?.persorVOList ?? [];
          if (data?.page) {
            this.totalClientes = data.page.totalElements;
          }
          resolve();
        },
        error: (error) => {
          console.error('Erro ao buscar livros:', error);
          reject(error);
        }
      });
    });
  }

  getTotalLivros(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.livrosService.getTotalLivros().subscribe({
        next: (data) => {
          this.dataSourceLivro.data = data?._embedded?.bookVOList ?? [];
          if (data?.page) {
            this.totalLivros = data.page.totalElements;
          }
          resolve();
        },
        error: (error) => {
          console.error('Erro ao buscar livros:', error);
          reject(error);
        }
      });
    });
  }

  getAllClientes(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.clientesService.getAllClientes().subscribe({
        next: (data) => {
          this.clientesAtivos = data;
          this.totalEnabled = this.clientesAtivos.filter((cliente: any) => cliente.enabled).length;
          resolve();
        },
        error: (error) => {
          console.error('Erro ao buscar clientes ativos');
          reject(error);
        }
      });
    });
  }
}
