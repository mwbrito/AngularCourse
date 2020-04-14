import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngif',
  templateUrl: './diretiva-ngif.component.html',
  styleUrls: ['./diretiva-ngif.component.css']
})
export class DiretivaNgifComponent implements OnInit {

  cursos: string[] = ["Angular 2"];
  mostrarDiv: boolean = false;

  onMostrarDiv(){
    this.mostrarDiv = !this.mostrarDiv;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
