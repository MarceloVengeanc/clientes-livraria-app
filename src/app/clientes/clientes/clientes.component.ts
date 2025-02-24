import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from '../cadastro-pessoas/clientes';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientesService } from 'src/app/services/clientes.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CadastroPessoasComponent } from '../cadastro-pessoas/cadastro-pessoas.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {

   displayedColumnsClientes: string[] = ['id', 'nome', 'sexo', 'endereco', 'acoes'];
    clientesDataSource = new MatTableDataSource<Clientes>();

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
      this.getClientes();
    }

    ngAfterViewInit(): void {
      this.clientesDataSource.paginator = this.paginatorClientes;
      this.clientesDataSource.sort = this.sortClientes;
    }

    getClientes() {
      const getClientes = this.clientesService.getTotalClientes();

      getClientes.subscribe({
        next: (data) => {
          const pessoas = data;

          this.clientesDataSource.data = pessoas;
          this.clientesDataSource.paginator = this.paginatorClientes;
          this.clientesDataSource.sort = this.sortClientes;
        },
        error: (error) => {
          console.error('Erro ao buscar clientes:', error);
        }
      })
    }

    onPageChange(event: any) {
      console.log('Page index:', event.pageIndex, 'Page size:', event.pageSize);
      this.getClientes();
    }

    aplicarFiltro(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.clientesDataSource.filter = filterValue.trim().toLowerCase();
    }

    editarClientes(clientes: Clientes) {
      const dialogRef = this.dialog.open(CadastroPessoasComponent, {
        width: '600px',
        data: { cliente: clientes }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getClientes();
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
            this.getClientes();
          },
          (error) => {
            this.mensagemErro = `Erro ao excluir o cliente com ID ${id}.`;
          }
        );
      }
    }
}
