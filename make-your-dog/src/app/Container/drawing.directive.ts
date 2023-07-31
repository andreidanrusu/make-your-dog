import { Directive, HostListener, Input, ElementRef, Renderer2, Host } from '@angular/core';

@Directive({
  selector: '[appDrawing]'
})
export class DrawingDirective {
  private ctx: CanvasRenderingContext2D;
  private isMouseDown:boolean = false;

  @Input({alias:'dogs-name'}) nameOfDog : string= ''; 

  constructor(private canvasElement: ElementRef, private renderer : Renderer2) {
      this.ctx = canvasElement.nativeElement.getContext('2d');
    }


  @HostListener('mousedown',['$event'])
  onmousedown(event : MouseEvent){
    this.isMouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
    console.log(event.offsetX, event.offsetY)

  }

  @HostListener('mouseup')
  onmouseup(){
    this.isMouseDown = false;
  }

  @HostListener('mouseleave')
  onmouseleave() {
    this.isMouseDown = false;
  }

  @HostListener('mousemove', ['$event'])
  onmousemove(event : MouseEvent){
    if (this.isMouseDown) {
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.stroke();
    }
  }
}
