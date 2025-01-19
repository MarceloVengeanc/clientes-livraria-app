import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { HomeComponent } from './home/home.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { LivrosComponent } from './livros/livros.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'livros', component: LivrosComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'configuracoes', component: ConfiguracoesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
