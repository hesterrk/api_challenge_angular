import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  // elementRef refers to the host element that we apply this attribute directive too -> a wrapper
  // elementRef acts as a reference for the 'host DOM element' -> which is the elemene that this directive is applied too
  constructor(private el: ElementRef) {
    // The underlying native element - dom element
    // not safest way to manipilate the DOM
  }

  // Mouse methods
  // HostListener => lets you subscribe to events of the host DOM element (element that hosts the directive)

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#a8c0ff');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
