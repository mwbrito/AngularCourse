import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
/*
import { CursosComponent } from './cursos/cursos.component';
import { routing } from './app.routing';
import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
*/
import { AppRoutingModule  } from './app.routing';
import { FormsModule } from '@angular/forms';
//import { AuthGuardService } from './guards/auth.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
//import { CursosModule } from './cursos/cursos.module';
//import { AlunosModule } from './alunos/alunos.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,
  /*
    CursosComponent,
    CursoDetalheComponent,
    CursoNaoEncontradoComponent
  */
  ],
  imports: [
    BrowserModule,
    //CursosModule,
    //AlunosModule,
    FormsModule,
    AppRoutingModule
  //  routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
