import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildActivationEnd } from "@angular/router";

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

const appRoutes: Routes = [    
    { path: 'cursos', 
        loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule), 
        canActivate: [AuthGuardService],  
        canActivateChild: [CursosGuard],
        canLoad: [AuthGuardService] },
    { path: 'alunos', 
        loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule), 
        canActivate: [AuthGuardService],
        canLoad: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },  
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PaginaNaoEncontradaComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}