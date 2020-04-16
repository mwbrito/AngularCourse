import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Learning JS Data Struture And Algo',
    rating: 4.53,
    numeroPaginas: 314,
    preco: 44.59,
    dataLancamento: new Date(2016, 5, 1),
    url: 'http://a.co/glqjpRP'
  }

  livros: string[] = ['Angular 2', 'dotnet'];
  filtro: string;

  addCurso(novoValor: string){
    this.livros.push(novoValor);
  }

  obterCursos(){
    
    if (this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() == '' )
      return this.livros;
    
    return this.livros.filter(
      (v) => {
        if (v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0)
          return true;
        else
          return false;
      });
  }

  constructor() { }

  ngOnInit(): void {
  }

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor assincrono'), 2000)
  });

  valorAsync2 = interval(2000).pipe(map(valor => 'Valor assíncrono 2'));

}
