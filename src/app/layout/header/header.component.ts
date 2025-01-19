import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private sidebarService: SidebarService) { }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
    //verifica se o status visivel muda
  }

}
