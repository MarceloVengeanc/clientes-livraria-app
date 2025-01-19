import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss']
})
export class LivrosComponent {

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
