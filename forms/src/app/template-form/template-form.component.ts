import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: '',
    email: ''
  }

  constructor(private httpClient: HttpClient ) { }

  onSubmit(form){

    this.httpClient.post('https://httpbin.org/post', JSON.stringify(form.value))
      .subscribe(dados => console.log(dados));

  }

  ngOnInit(): void {
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep, form){
    cep = cep.replace(/\D/g, '');

    if(cep != ''){
      var validacep = /^[0-9]{8}$/;

      this.resetaDadosForm(form);

      if(validacep.test(cep)) {
        this.httpClient.get(`https://viacep.com.br/ws/${cep}/json`)
        .subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados, form){
    // form.set({
    //   nome: form.value.nome,
    //   email: form.value.email,
    //   Endereco: {
    //     cep: dados.cep,
    //     numero: form.value.numero,
    //     complemento: form.value.complemento,
    //     rua: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //   }     
    // });


    form.form.patchValue({
      Endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      } 
    });
  }

  resetaDadosForm(form){
    form.form.patchValue({
      Endereco: {
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      } 
    });
  }

}
