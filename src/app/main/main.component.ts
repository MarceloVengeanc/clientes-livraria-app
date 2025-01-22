import { AuthService } from '../services/auth.service';
import { SidebarService } from './../services/sidebar.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  isSidebarVisible = true;
  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService) { }

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }

  isLoggedIn(): boolean {
    console.log('logado: ', this.authService.isLoggedIn)
    return this.authService.isLoggedIn();
  }

}
