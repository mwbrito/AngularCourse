import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  id: number;
  inscricao: Subscription;
  curso: any;

  constructor(
      private _activatedRoute: ActivatedRoute, 
      private cursoService: CursosService,
      private router: Router) { 
    //this.id = _activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.inscricao = this._activatedRoute.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.curso = this.cursoService.getCurso(this.id);
      }
    );

    if(this.curso == null){
      this.router.navigate(['cursos', this.id,'naoEncontrado']);
    }
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
