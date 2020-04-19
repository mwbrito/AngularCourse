import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { IFormCanDeactivate } from 'src/app/guards/form_candeactivete';


@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  id: number;
  inscricao: Subscription;
  aluno: any;
  formMudou: boolean = false;
  
  constructor(
    private _activatedRoute: ActivatedRoute, 
    private alunoService: AlunosService,
    private router: Router) { }

  ngOnInit(): void {
    this.inscricao = this._activatedRoute.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.aluno = this.alunoService.getAluno(this.id);

        if(this.aluno === null)
          this.aluno = {};
      }
    );

    return null;
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  onInput(){
    this.formMudou = true;
  }

  podeMudarRota(){

    if(this.formMudou){
      return confirm("Tem certeza que quer sair desta pagina?");
    }

    return true;
  }

  podeDesativar(){
    return this.podeMudarRota();
  }

}
