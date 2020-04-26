import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

// @Component({
//   selector: 'app-base-form',
//   templateUrl: '<div></div>'
// })
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit();

  onSubmit(){
    if(this.formulario.valid){
      this.submit();
    }
    else {
      this.verificarValidacoesForm(this.formulario);
    }
  }

  verificarValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      const control = formGroup.get(campo);
      control.markAsDirty();
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray)
        this.verificarValidacoesForm(control);
    });
  }

  resetarForm() {
    this.formulario.reset();
  }

  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  verificaEmailValido(campo) {
    if (this.formulario.get(campo).errors) {
      return this.formulario.get(campo).errors['email'] && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
    }
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

}
