import { Output,EventEmitter,AfterViewChecked, AfterViewInit, Component, ElementRef, Host, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { DrawingDirective } from './drawing.directive';
import { Data } from '@angular/router';
import { DogEntry } from '../dog-entry';
import { DogsService } from '../services/dogs.service';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css']
})



export class ContainerComponent implements AfterViewInit {
    
    private canvasWidth:number = 1200;
    private canvasHeight:number = 600;
    dogName : string = '';


    private colorPicked : string = '#000000';
    private lineSize : string = '10';
    constructor(private dogService : DogsService,private elementRef: ElementRef, private renderer: Renderer2){
    }

    ngAfterViewInit(): void {
        let ctx:CanvasRenderingContext2D = this.getContext();
        ctx.canvas.width = this.canvasWidth;
        ctx.canvas.height = this.canvasHeight;
        ctx.lineWidth = +this.lineSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }

    @HostListener('window:resize')
    onResize() {
        let ctx : CanvasRenderingContext2D = this.getContext();
        ctx.canvas.width = this.canvasWidth;
        ctx.canvas.height = this.canvasHeight;
        ctx.strokeStyle = this.colorPicked;
    }

    changeContextColor(event : Event) {
        let ctx:CanvasRenderingContext2D = this.getContext();
        const colorPicker = event.target as HTMLInputElement;
        this.colorPicked = colorPicker.value;
        ctx.strokeStyle = this.colorPicked;
    }

    changeValue(event : Event) {
        let ctx:CanvasRenderingContext2D = this.getContext();
        const size = event.target as HTMLInputElement;
        this.lineSize = size.value;
        ctx.lineWidth = +this.lineSize;
    }

    clearCanvas(){ 
        let ctx:CanvasRenderingContext2D = this.getContext();
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        console.log(window.innerWidth);
    }

    saveCanvas() {
        let ctx:CanvasRenderingContext2D = this.getContext();
        var a = document.createElement('a');
        let canvasOfDog = ctx.canvas.toDataURL("image/png");
        // window.location.href = canvasOfDog;
        // a.href =canvasOfDog;
        // a.download = this.dogName;
        // document.body.appendChild(a);
        // a.click();
        this.dogService.addDog(this.dogName, canvasOfDog);
    }

    getContext():CanvasRenderingContext2D {
        const canvasElement = this.elementRef.nativeElement.querySelector('.dog-container');
        return canvasElement.getContext('2d');
    }

    saveDog() {
        if (this.dogName != '') {
            
        }
    }
}