import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input('appHighlight') highlightColor: string;

  // elementRef refers to the host element that we apply this attribute directive too -> a wrapper
  // elementRef acts as a reference for the 'host DOM element' -> which is the elemene that this directive is applied too
  constructor(private el: ElementRef) {
    // The underlying native element - dom element
    // not safest way to manipilate the DOM
  }

  // Mouse methods
  // HostListener => lets you subscribe to events of the host DOM element (element that hosts the directive)

  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight(null);
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
