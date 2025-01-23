import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-livros',
  templateUrl: '../cadastros-livros/cadastros-livros.component.html',
  styleUrls: ['../cadastros-livros/cadastros-livros.component.scss']
})
export class CadastrosLivrosComponent {

  form: FormGroup;
  amount: any;
  taxableValue!: string;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      endereco: ['', Validators.required],
      sexo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form preenchido:', this.form.value);
    }
  }

  onCancel() {
    this.form.reset();
  }
}
