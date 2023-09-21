import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'img[default]'
})
export class ImagePreloadDirective implements OnChanges {
  @Input() src!: string;
  @Input() default!: string;

  constructor(private el: ElementRef) {
  }

  @HostListener('error', ['$event.target']) setDefaultUrl(img: HTMLImageElement): void {
    img.src = this.default;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.el.nativeElement.src = changes['src'].currentValue;
  }
}
