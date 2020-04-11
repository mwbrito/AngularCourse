import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://loiane.training';
  urlImagem: string = 'http://lorempixel.com/400/200/nature';
  cursoAngular: boolean = true;

  nomeCurso: string = 'Angular';
  valorInicial: number = 15;

  valorAtual: string = "";
  valorSalvo: string = "";
  isMouseOver: boolean = false;
  nome: string = "abc";
  pessoa: any = {
    nome: 'def',
    idade: 20
  }

  salvarValor(valor){
    this.valorSalvo = valor;
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento){
    this.valorInicial = evento.novoValor;
  }

  getValor(){
    return 1;
  }

  getCurtirCurso(){
    return true;
  }
  
  botaoClicado(){
    alert("Botao clicado");
  }

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value;
    
  }

  constructor() { }

  ngOnInit(): void {
  }

}
