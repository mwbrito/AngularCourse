import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, delay } from 'rxjs/operators';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private httpCliente: HttpClient) { }

  verificarEmail(_email: string){
    return this.httpCliente.get('assets/dados/verificarEmails.json')
    .pipe( 
      delay(2000),
      tap(console.log),
      map((dados: {emails: any[]}) => dados.emails),
      tap(console.log),
      map((dados: {email: string}[]) => dados.filter(v => v.email === _email)),
      tap(console.log),
      map((dados: any[]) => dados.length > 0),
      tap(console.log)
    )
  }
}