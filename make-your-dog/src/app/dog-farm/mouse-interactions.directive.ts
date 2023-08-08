import { Directive, HostListener } from '@angular/core';
import { DogsService } from '../services/dogs.service';

@Directive({
  selector: '[appMouseInteractions]'
})
export class MouseInteractionsDirective {
  private mouseOnCanvas = false;

  constructor(private dogService : DogsService) { }


  @HostListener('mouseenter') 
  onEnter() {
    this.mouseOnCanvas = true;
  }

  @HostListener('mouseleave') 
  onLeave() {
    this.mouseOnCanvas = false;
  }

  @HostListener('mousemove', ['$event'])
  onmousemove(event : MouseEvent){
    if (this.mouseOnCanvas) {
      this.dogService.setMouseCoordonates(event.offsetX, event.offsetY);
    }
  }

  @HostListener('mousedown')
  onmousedown(){
    if (this.mouseOnCanvas) {
      this.dogService.setMouseDown(true);
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    if (this.mouseOnCanvas) {
      this.dogService.setMouseDown(false);
    }
  }

  
}
