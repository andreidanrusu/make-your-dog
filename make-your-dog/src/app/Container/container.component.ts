import { AfterViewChecked, AfterViewInit, Component, ElementRef, Host, HostListener, Renderer2, ViewChild } from '@angular/core';
import { DrawingDirective } from './drawing.directive';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css']
})

export class ContainerComponent implements AfterViewInit {
    private devicePixelRatio = window.devicePixelRatio;
    private colorPicked : string = '#000000';
    private lineSize : string = '10';
    constructor(private elementRef: ElementRef, private renderer: Renderer2){
    }

    ngAfterViewInit(): void {
        const canvasElement = this.elementRef.nativeElement.querySelector('.dog-container');
        let ctx:CanvasRenderingContext2D = canvasElement.getContext('2d');
        
        ctx.canvas.width = 1200;
        ctx.canvas.height = 850;
        ctx.lineWidth = +this.lineSize;
        ctx.lineCap = 'round';
    }

    changeContextColor(event : Event) {
        const canvasElement = this.elementRef.nativeElement.querySelector('.dog-container');
        let ctx:CanvasRenderingContext2D = canvasElement.getContext('2d');
        const colorPicker = event.target as HTMLInputElement;
        this.colorPicked = colorPicker.value;
        ctx.strokeStyle = this.colorPicked;
    }

    changeValue(event : Event) {
        const canvasElement = this.elementRef.nativeElement.querySelector('.dog-container');
        let ctx:CanvasRenderingContext2D = canvasElement.getContext('2d');
        const size = event.target as HTMLInputElement;
        this.lineSize = size.value;
        ctx.lineWidth = +this.lineSize;
    }
    
    
}