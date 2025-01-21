import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  username: string = 'marcelo';
  password: string = 'coffe123';
  token: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login(): void {
    this.authService.authenticate(this.username, this.password).subscribe(
      (response) => {
        this.token = response.token;
        console.log('token', this.token);
      },
        (error) => {
          console.log('erro token', error);
        }
      );
  }

}
