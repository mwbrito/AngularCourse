import { Injectable } from '@angular/core';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private alunos: Aluno[] = [
    { id: 1, nome: 'Joao', email: 'joao@gmail.com' },
    { id: 2, nome: 'Chiquinha', email: 'chiq2001@gmail.com'},
    { id: 3, nome: 'Neo', email: 'matrix@gmail.com'},
  ]

  getAlunos(){
    return this.alunos;
  }

  getAluno(id: number){
    let alunos = this.getAlunos();

    for(let i = 0; i < alunos.length; i++){
      if(alunos[i].id == id)
        return alunos[i];
    }

    return null;
  }

  constructor() { }
}
