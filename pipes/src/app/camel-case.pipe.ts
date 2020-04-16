import { Pipe, PipeTransform } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let values = value.split(' ');
    let result = '';

    for(let v of values){
      result += this.capitalize(v) + ' ';
    }

    return result;
  }

  capitalize(valor: string){

    return valor.substr(0, 1).toUpperCase() + valor.substr(1).toLowerCase();

  }

}
