import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ng-class',
  templateUrl: './diretiva-ng-class.component.html',
  styleUrls: ['./diretiva-ng-class.component.css']
})
export class DiretivaNgClassComponent implements OnInit {

  meuFavorito: boolean = false;

  clickMeuFavorito(){
    this.meuFavorito = !this.meuFavorito;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
