import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
})
export class UppercaseDirective{

  constructor() { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }
}
