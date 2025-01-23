import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clientes } from './clientes';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.scss']
})


export class CadastroClientesComponent implements OnInit {

  cliente!: Clientes;
  form: FormGroup;

  gender = [
    { value: 'masculino', viewValue: 'Masculino' },
    { value: 'feminino', viewValue: 'Feminino' }
  ];

  constructor(private fb: FormBuilder,
    private router: Router
  ) {
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
