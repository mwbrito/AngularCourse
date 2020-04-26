import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadosBr } from '../modelos/estados-br.model';
import { Cidade } from '../modelos/cidades-br.models';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private httpClient: HttpClient) { }

  getEstadosBr() {
    return this.httpClient.get<EstadosBr[]>('assets/dados/estadosbr.json');
  }

  getCidadesBr(idEstado: number) {
    return this.httpClient.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado)),
    );
  }

  getCargos(){
    return[
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'},
    ]
  }

  getTecnologias(){
    return [
      { nome: 'Java', desc: 'Java' },
      { nome: 'ASP.NET', desc: 'MS ASP.NET' },
      { nome: 'SQLSERVER', desc: 'SQL' },
      { nome: 'EntityFramework', desc: 'Entity' },
    ]
  }

  getNewsletter(){
    return [
      { valor: 's', desc: 'Sim' },
      { valor: 'n', desc: 'Não' },
    ]
  }
}
