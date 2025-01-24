import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Livros } from './livros';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LivrosService } from '../services/livros.service';
import { MatDialog } from '@angular/material/dialog';
import { CadastrosLivrosComponent } from './cadastros-livros/cadastros-livros.component';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss']
})
export class LivrosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'titulo', 'autor', 'preco', 'dataLancamento', 'acoes'];
  dataSource = new MatTableDataSource<Livros>();

  carregando = false;

  totalElements: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  livro: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private livrosService: LivrosService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getLivros(this.pageIndex, this.pageSize)
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getLivros(page: number, size: number): void {
    this.livrosService.getLivros(page, size).subscribe({
      next: (data) => {
        this.dataSource.data = data?._embedded?.bookVOList ?? [];
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

  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cadastrarLivro() {
    const dialogRef = this.dialog.open(CadastrosLivrosComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
    });
  }

  editarLivro(livros: Livros) {
    const dialogRef = this.dialog.open(CadastrosLivrosComponent, {
      width: '600px',
      data: { livro: livros }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }


  excluirLivro(id: number) {
    this.dataSource.data = this.dataSource.data.filter(pessoa => pessoa.id !== id);
  }
}
