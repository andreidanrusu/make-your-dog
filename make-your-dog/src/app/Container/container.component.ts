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
    
    private canvasWidth:number = 1200;
    private canvasHeight:number = 850;
    @Input() dogsName : string = '';
    @Output() sendDogToFarmEvent = new EventEmitter<any>();
    @ViewChild('canvasContainer', { static: false }) canvasContainer!: ElementRef;

    private colorPicked : string = '#000000';
    private lineSize : string = '10';
    constructor(private elementRef: ElementRef, private renderer: Renderer2){
    }

    ngAfterViewInit(): void {
        let ctx:CanvasRenderingContext2D = this.getContext();
        ctx.canvas.width = 0.6 * window.innerWidth;
        ctx.canvas.height = 0.6 * window.innerHeight;
        ctx.lineWidth = +this.lineSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }

    @HostListener('window:resize')
    onResize() {
        let ctx : CanvasRenderingContext2D = this.getContext();
        ctx.canvas.width = 0.6 * window.innerWidth;
        ctx.canvas.height = 0.6 * window.innerHeight;
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

    saveCanvas(dogName : string) {
        let ctx:CanvasRenderingContext2D = this.getContext();
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
        console.log(dog.image);
    }

    getContext():CanvasRenderingContext2D {
        const canvasElement = this.elementRef.nativeElement.querySelector('.dog-container');
        return canvasElement.getContext('2d');
    }
    
    
}