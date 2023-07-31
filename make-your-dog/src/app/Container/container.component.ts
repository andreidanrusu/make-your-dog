import { Output,EventEmitter,AfterViewChecked, AfterViewInit, Component, ElementRef, Host, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { DrawingDirective } from './drawing.directive';
import { Data } from '@angular/router';
import { DogEntry } from '../dog-entry';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css']
})



export class ContainerComponent implements AfterViewInit {
    
    private devicePixelRatio : number = window.devicePixelRatio;
    private canvasWidth:number = 1200;
    private canvasHeight:number = 850;
    @Input() dogsName : string = '';
    @Output() sendDogToFarmEvent = new EventEmitter<any>();

    private colorPicked : string = '#000000';
    private lineSize : string = '10';
    constructor(private elementRef: ElementRef, private renderer: Renderer2){
    }

    ngAfterViewInit(): void {
        const canvasElement = this.elementRef.nativeElement.querySelector('.dog-container');
        let ctx:CanvasRenderingContext2D = canvasElement.getContext('2d');
        
        ctx.canvas.width = this.canvasWidth;
        ctx.canvas.height = this.canvasHeight;
        ctx.lineWidth = +this.lineSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
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

    clearCanvas(){ 
        const canvasElement = this.elementRef.nativeElement.querySelector('.dog-container');
        let ctx:CanvasRenderingContext2D = canvasElement.getContext('2d');
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        console.log("clear");
    }

    saveCanvas(dogName : string) {
        const canvasElement = this.elementRef.nativeElement.querySelector('.dog-container');
        let ctx:CanvasRenderingContext2D = canvasElement.getContext('2d');
        console.log("saved")
        var a = document.createElement('a');
        let canvasOfDog = ctx.canvas.toDataURL("image/png");
        window.location.href = canvasOfDog;
        a.href =canvasOfDog;
        a.download = dogName;
        document.body.appendChild(a);
        a.click();
        let dog : DogEntry = {name : dogName, image:canvasOfDog};
        this.sendDogToFarmEvent.emit(dog);

    }
    
    
}