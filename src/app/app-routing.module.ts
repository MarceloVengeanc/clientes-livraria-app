import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPessoasComponent } from './clientes/cadastro-pessoas/cadastro-pessoas.component';
import { HomeComponent } from './home/home.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { LivrosComponent } from './livros/livros.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { totalPessoasComponent } from './clientes/totalPessoas.component';
import { CadastrosLivrosComponent } from './livros/cadastros-livros/cadastros-livros.component';
import { DetalhadoComponent } from './dashboard/detalhado/detalhado.component';
import { MensagensComponent } from './dashboard/mensagens/mensagens.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'cadastroclientes', component: CadastroPessoasComponent, canActivate: [authGuard] },
  { path: 'livros', component: LivrosComponent, canActivate: [authGuard] },
  { path: 'calendario', component: CalendarioComponent, canActivate: [authGuard] },
  { path: 'configuracoes', component: ConfiguracoesComponent, canActivate: [authGuard] },
  { path: 'clientes', component: totalPessoasComponent, canActivate: [authGuard] },
  { path: 'cadastrolivros', component: CadastrosLivrosComponent, canActivate: [authGuard] },
  { path: 'detalhado', component: DetalhadoComponent, canActivate: [authGuard] },
  { path: 'mensagens', component: MensagensComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
