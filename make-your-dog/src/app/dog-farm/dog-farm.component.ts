import { Component, AfterViewInit, ElementRef, Renderer2, HostListener, NgZone } from '@angular/core';
import { DogEntry } from '../dog-entry';
import { animate, animation, state, style, transition, trigger } from '@angular/animations';
import { DogsService } from '../services/dogs.service';
import { DogCanvas } from '../dog-canvas';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-dog-farm',
  templateUrl: './dog-farm.component.html',
  styleUrls: ['./dog-farm.component.css']
})
export class DogFarmComponent implements AfterViewInit{
  private CanvasElem? : HTMLCanvasElement;
  private ctx : CanvasRenderingContext2D | any;
  private dogPics : DogCanvas[] = [];

  constructor(private ngZone : NgZone,private dogService : DogsService,private elementRef: ElementRef, private renderer: Renderer2) {
    
  }

  ngAfterViewInit(): void {
    this.CanvasElem = this.elementRef.nativeElement.querySelector('.dog-farm-canvas');
    if (this.CanvasElem){
      this.ctx = this.CanvasElem.getContext('2d');
      this.CanvasElem.width = 0.8 * window.innerWidth;
      this.CanvasElem.height = 0.8 * window.innerHeight;
      for (let i = 0; i < this.dogService.dogs.length; i++) {
        this.dogPics.push(new DogCanvas(this.dogService.dogs[i].id ,this.CanvasElem.width, this.CanvasElem.height, Math.floor(Math.random() * 201 + 200), Math.floor(Math.random() * 201 + 200),
          this.ctx, this.dogService.dogs[i].image));
      }

    }
    this.animate();
  }

  @HostListener('window:resie')
  onResize() {
    if (this.CanvasElem) {
      this.CanvasElem.width = 0.8 * window.innerWidth;
      this.CanvasElem.height = 0.8 * window.innerHeight;
      this.dogPics.forEach(dog => {
        dog.changeCanvasSize(0.8 * window.innerHeight, 0.8 * window.innerWidth);
      })
    }
  }

  animate() {
    this.ngZone.runOutsideAngular (() => {
      const start :number = performance.now();
      const animationStep = (timestamp : number) => {
        const elapsed = timestamp - start;
        if (elapsed < 500000) {
          this.ctx.clearRect(0,0, this.CanvasElem?.width, this.CanvasElem?.width);
          this.updateDogPics();
          this.dogPics.forEach(dog => {
            dog.update();
          })
          requestAnimationFrame(animationStep);
        }
      };
      requestAnimationFrame(animationStep);
    });
  }

  updateDogPics() {
    if (this.dogService.dogs.length > this.dogPics.length) {
      for (let i = 0; i < this.dogService.dogs.length; i ++) {  
          for (let j = 0; j < this.dogService.dogs.length; j ++) {
            if (this.dogPics[i].getId() === this.dogService.dogs[j].id) {
              break;
            }
            if (this.CanvasElem) {
            this.dogPics.push(new DogCanvas(this.dogService.dogs[i].id ,this.CanvasElem.width, this.CanvasElem.height, Math.floor(Math.random() * 201 + 200), Math.floor(Math.random() * 201 + 200),
            this.ctx, this.dogService.dogs[i].image));
          }
          }
      }
    }
  }
  
  
}
