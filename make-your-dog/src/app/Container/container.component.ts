import { Component, ElementRef, Host, HostListener, ViewChild } from '@angular/core';
import { DrawingDirective } from './drawing.directive';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css']
})

export class ContainerComponent {
    widthValue : number = 300;
    heightValue : number = 150;    
}