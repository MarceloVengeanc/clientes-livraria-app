import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clientes } from './clientes';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})


export class ClientesComponent implements OnInit {

  cliente!: Clientes;
  form: FormGroup;

  gender = [
    { value: 'masculino', viewValue: 'Masculino' },
    { value: 'feminino', viewValue: 'Feminino' },
    { value: 'outro', viewValue: 'Outro' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      endereco: ['', Validators.required],
      sexo: ['', Validators.required]
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form preenchido:', this.form.value);
    }
  }

  onCancel() {
    this.form.reset();
  }
}
