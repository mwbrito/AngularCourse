import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {

  id: number;
  inscricao: Subscription;
  aluno: any;
  
  constructor(
    private _activatedRoute: ActivatedRoute, 
    private alunoService: AlunosService,
    private router: Router) { }

  ngOnInit(): void {
    // this.inscricao = this._activatedRoute.params.subscribe(
    //   (params: any) => {
    //     this.id = params['id'];
    //     this.aluno = this.alunoService.getAluno(this.id);
    //   }
    // );

    // return null;
    
    //if(this.aluno == null){
    //  this.router.navigate(['curso', this.id,'naoEncontrado']);
    //}

    this.inscricao = this._activatedRoute.data.subscribe(
      (info) => {
        this.aluno = info.aluno;
      }
    );
  }

  editarAluno(){
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }
}
