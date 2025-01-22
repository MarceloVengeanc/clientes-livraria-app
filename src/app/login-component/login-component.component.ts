import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  login(): void {
    console.log('Chamando authenticate()'); // 🔍 Confirmação antes da chamada à API

    this.authService.authenticate(this.username, this.password).subscribe(
      (response) => {
        console.log('Login bem-sucedido:', response); // 🔍 Verifica se caiu aqui
        console.log('Token armazenado?', this.authService.isLoggedIn());
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erro de autenticação:', error);
        this.errorMessage = 'Usuário ou senha inválidos';
      }
    );
  }


}
