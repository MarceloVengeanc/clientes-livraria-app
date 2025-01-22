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
    this.authService.authenticate(this.username, this.password).subscribe(
      () => {
        console.log(this.authService.isLoggedIn(), 'teste')
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'Usuário ou senha inválidos';
        console.error('Erro de autenticação:', error);
      }
    );
  }
}
