import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDrawing]'
})
export class DrawingDirective {
  private ctx: CanvasRenderingContext2D;

  constructor(private canvasElement: ElementRef, private renderer : Renderer2) {
      this.ctx = canvasElement.nativeElement.getContext('2d');
   }


  @HostListener('mousedown')
  onmousedown(){
    this.drawRectangle(this.canvasElement.nativeElement);
  }
  
  private drawRectangle(canvas:HTMLCanvasElement) {
    let ctx = canvas.getContext('2d');
    ctx?.fillRect(0,0,100,100);
  }

  private draw(canvas:HTMLCanvasElement){
    this.ctx.beginPath();
    let offsets = this.getOffset(canvas);
    this.ctx.strokeStyle = `rgb(
      0,
      ${Math.floor(255 - 42.5)},
      ${Math.floor(255 - 42.5)})`;
      
  }

  private getOffset(canvas: HTMLElement){
    const bound = canvas.getBoundingClientRect();
    return {
      top: bound.top + document.body.scrollTop,
      left: bound.left + document.body.scrollLeft
    }
  }
}
