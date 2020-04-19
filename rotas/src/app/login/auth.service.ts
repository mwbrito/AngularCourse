import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario){
    if(usuario.nome === 'usuario@mail.com' && usuario.senha === '123' ){
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(this.usuarioAutenticado);
      this.router.navigate(['/']);
    }
    else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(this.usuarioAutenticado);
    }
    
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }
}
