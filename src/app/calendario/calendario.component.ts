import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {
  filtro = new FormControl('');
  selecionado = '';
  itens: string[] = ['Item 1', 'Item 2', 'Item 3', 'Outro'];
  itensFiltrados: string[] = [...this.itens];

  constructor() {
    this.filtro.valueChanges.subscribe(value => {
      this.itensFiltrados = this.itens.filter(item =>
        item.toLowerCase().includes((value ?? '').toLowerCase())
      );
    });
  }
}
