import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../cursos';
import { Observable, empty, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  //cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  idCursoSelecionado: number;

  constructor(private service: Cursos2Service,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //this.service.list().subscribe(dados => this.cursos = dados);
    this.onRefresh();


    // this.service.list().subscribe(
    //   dados => {},
    //   error => {},
    //   () => console.log('complete')
    // );


  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError(erro => {
        console.error(erro);
        //this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos.');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos.';
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(id) {
    this.idCursoSelecionado = id;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
    const result$ = this.alertService.showConfirm('Confirmacao', 'Tem certeza que deseja remover este curso?', 'Sim', 'Nao');

    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ?
          this.service.remove(id)
          : EMPTY
        )
      ).subscribe(
        success => this.onRefresh(),
        error => this.alertService.showAlertDanger('Erro ao remover curso.')
      )
  }

  onConfirmDelete() {
    this.service.remove(this.idCursoSelecionado).subscribe(
      success => { this.onRefresh(); this.deleteModalRef.hide(); },
      error => this.alertService.showAlertDanger('Erro ao remover curso.')
    );
  }

  onCancelDelete() {
    this.deleteModalRef.hide();
  }

}
