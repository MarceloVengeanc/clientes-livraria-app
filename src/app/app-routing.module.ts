import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { HomeComponent } from './home/home.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { LivrosComponent } from './livros/livros.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [authGuard] },
  { path: 'livros', component: LivrosComponent, canActivate: [authGuard] },
  { path: 'calendario', component: CalendarioComponent, canActivate: [authGuard] },
  { path: 'configuracoes', component: ConfiguracoesComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
