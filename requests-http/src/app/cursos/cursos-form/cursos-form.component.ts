import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal/public_api';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
  preserveWhitespaces: true
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params.id;
    //     const curso$ = this.service.loadById(id);
    //     curso$.subscribe(curso => {
    //       this.updateForm(curso);
    //     });
    //   }
    // );

    // this.route.params
    // .pipe(
    //   map((params: any) => params.id),
    //   switchMap(id => this.service.loadById(id))
    // ).subscribe( curso => this.updateForm(curso));

    let curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id:  [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });
  }

  onSubmit() {

    this.submitted = true;

    if (this.form.valid) {

      this.service.save(this.form.value).subscribe(
        success => {this.modal.showAlertSuccess('Requisição realizada com sucesso.'), this.location.back()},
        error => this.modal.showAlertDanger('Erro na requisição curso.'),
        () => console.log('request complete')
      );      
    }
  }

  onCancel() {

    this.submitted = false;
    this.form.reset();

  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  updateForm(curso){
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }
}
