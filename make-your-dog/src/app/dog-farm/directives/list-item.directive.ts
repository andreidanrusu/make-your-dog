import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DogsService } from 'src/app/services/dogs.service';

@Directive({
  selector: '[appListItem]'
})
export class ListItemDirective implements AfterViewInit{
  private dogName : string = '';
  @Input() dogId : number = -1;

  constructor(private dogService : DogsService, private element: ElementRef) {
   }
  ngAfterViewInit(): void {
    this.dogName = this.element.nativeElement.innerText;
  }





}
