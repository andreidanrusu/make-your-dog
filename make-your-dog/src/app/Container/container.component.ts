import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit{
    @ViewChild('canvas',{static:true}) drawingCanvas!: ElementRef;
    canvasActive : boolean = false;
    canvasContext : CanvasRenderingContext2D | undefined;
    ngOnInit(): void {
        const canvas : HTMLCanvasElement = this.drawingCanvas.nativeElement;
        const context = canvas.getContext('2d');
        if (context) {
            this.canvasActive = true;
            this.drawRect(context);
        }
    }

    drawRect(context:CanvasRenderingContext2D){
        context.fillRect(0,0,100,100);
    }
   
}