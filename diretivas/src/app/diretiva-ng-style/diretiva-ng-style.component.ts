import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ng-style',
  templateUrl: './diretiva-ng-style.component.html',
  styleUrls: ['./diretiva-ng-style.component.css']
})
export class DiretivaNgStyleComponent implements OnInit {

  ativo: boolean = false;
  tamanhoFonte:number = 18;

  onClick(){
    this.ativo = !this.ativo;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
