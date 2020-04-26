import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadosBr } from '../shared/modelos/estados-br.model';
import { Cidade } from '../shared/modelos/cidades-br.models';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable, empty } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  //formulario: FormGroup;
  //estados: Observable<EstadosBr[]>;
  estados: EstadosBr[];
  cidades: Cidade[];
  cargos: any[];
  tecnologias: any[];
  newsletter: any[];
  frameworks = ['Angular', 'dotnet', 'Ruby', 'JQuery'];

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {
    super();
  }

  ngOnInit(): void {

    this.dropdownService.getEstadosBr().subscribe(dados => { this.estados = dados; });
    

    //this.verificaEmailService.verificarEmail('').subscribe();

    //this.estados = this.dropdownService.getEstadosBr();
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletter = this.dropdownService.getNewsletter();

    // this.formulario = new  FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),

    // });

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null,],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),

      cargo: [null],

      tecnologias: [null],

      newsletter: ['s'],

      termos: [null, Validators.pattern('true')],

      frameworks: this.buildFrameworks()

    });

    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
          : empty()
        ),
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});
      
    // .subscribe(status => {
    //   if(status === 'VALID'){
    //     this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
    //     .subscribe(dados => this.populaDadosForm(dados));
    //   }
    // });

    this.formulario.get('endereco.estado').valueChanges
        .pipe(
          map(estado => this.estados.filter(e => e.sigla === estado)),
          map(estados => estados && estados.length > 0 ? estados[0].id : empty),
          switchMap((estadoId: number) => this.dropdownService.getCidadesBr(estadoId))
        ).subscribe(cidades => this.cidades = cidades);
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
  }

  submit() {

    let valuesSubmit = Object.assign({}, this.formulario.value);

    valuesSubmit = Object.assign(valuesSubmit, {
      frameworks: valuesSubmit.frameworks.map((v, i) => v ? this.frameworks[i] : null).filter(v => v !== null)
    });

    this.httpClient.post('https://httpbin.org/post', JSON.stringify(valuesSubmit))
      .subscribe(dados => {
        console.log(dados);
        this.resetarForm();
      },
        (error: any) => alert('Eeerro'));
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados) {

    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      Endereco: {
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' };
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.desc === obj2.desc) : obj1 === obj2;
  }

  setarTechs() {
    this.formulario.get('tecnologias').setValue(['SQLSERVER', 'Java']);
  }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }
}
