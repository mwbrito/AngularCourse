import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'p[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) { 
    //console.log(_elementRef);
    // security problem with ElementRef
    //_elementRef.nativeElement.style.backgroundColor = 'yellow';
    // same but better
    _renderer.setStyle(_elementRef.nativeElement, 'background-color', 'yellow')
  }

}
