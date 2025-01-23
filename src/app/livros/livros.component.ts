import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Livros } from './livros';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss']
})
export class LivrosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'titulo', 'autor', 'preco', 'dataLancamento', 'acoes'];
  dataSource = new MatTableDataSource<Livros>();

  totalElements: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;


  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  excluirLivro(id: number) {
    this.dataSource.data = this.dataSource.data.filter(pessoa => pessoa.id !== id);
  }

  onPageChanged(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
