import { Component, AfterViewInit, ElementRef, Renderer2, HostListener, NgZone, Host, OnDestroy } from '@angular/core';
import { DogEntry } from '../dog-entry';
import { animate, animation, state, style, transition, trigger } from '@angular/animations';
import { DogsService } from '../services/dogs.service';
import { DogCanvas } from '../objects/dog-canvas';
import { Subscription, timestamp } from 'rxjs';
import { Router } from '@angular/router';
import { GrassBlade } from '../objects/grass-blade';

@Component({
  selector: 'app-dog-farm',
  templateUrl: './dog-farm.component.html',
  styleUrls: ['./dog-farm.component.css']
})
export class DogFarmComponent implements AfterViewInit, OnDestroy{
  private CanvasElem? : HTMLCanvasElement;
  private ctx : CanvasRenderingContext2D | any;
  private dogPics : DogCanvas[] = [];
  private mouseOnCanvas : boolean = false;
  private routerSubscription : Subscription;
  private grassBlades : GrassBlade[] = [];
  searchText : string = "";
  filteredList : DogEntry[];

  constructor(private ngZone : NgZone,private dogService : DogsService,private elementRef: ElementRef, private renderer: Renderer2,
    private router : Router) {
    this.filteredList = this.getDogsFromService();
    this.routerSubscription = this.router.events.subscribe((event) => {
    this.dogService.removeSelectedDogId();
    })
  }

  onKeyPressEvent() {
    this.filteredList = this.getDogsFromService().filter((dog) => dog.name.toLowerCase().includes(this.searchText));
    console.log(this.filteredList);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
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
      // this.grassBlades.push(new GrassBlade(100, 100, this.ctx));

    }
    this.animate();
  }

  createBlades() {
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
    this.ngZone.runOutsideAngular(() => {
      const FPS = 60;
      const FRAME_DURATION = 1000 / FPS;
      let lastFrameTime = performance.now();
      let accumulator = 0;

      const animationStep = (timestamp: number) => {
        const delta = timestamp - lastFrameTime;
        lastFrameTime = timestamp;
        accumulator += delta;

        while (accumulator >= FRAME_DURATION) {
          this.ctx.clearRect(0, 0, this.CanvasElem?.width, this.CanvasElem?.height);
          this.updateDogPics();

          this.dogPics.forEach(dog => {
            this.checkIfMouseOnDog(dog);
            dog.update();
          });

          this.grassBlades.forEach(blade => {
            blade.draw();
          });

          accumulator -= FRAME_DURATION;
        }

        requestAnimationFrame(animationStep);
      };

      requestAnimationFrame(animationStep);
    });
  }

  checkIfMouseOnDog(dog : DogCanvas) {
      let mouseCoordonates = this.dogService.getMouseCoordonates();
      let dogCoodonates = dog.getCoordonates();
      let dogSize = dog.getSize();
      if (this.dogService.isSelectedFromList()) {
        if (this.dogService.getSelectedDogId() === dog.getId()) {
          dog.selectDog();
        } else {
          dog.deselectDog();
        }
      } else {
        if (mouseCoordonates.x > dogCoodonates.x && mouseCoordonates.x < dogCoodonates.x + dogSize.width
        && mouseCoordonates.y > dogCoodonates.y && mouseCoordonates.y < dogCoodonates.y + dogSize.height) {
          if (this.dogService.getSelectedDogId() === dog.getId()) {
            dog.selectDog();
          } else if (this.dogService.getSelectedDogId() === -1) {
            this.dogService.setSelectedDogId(dog.getId());
            dog.selectDog();
          } else {
            dog.deselectDog();
          }
        } else {
          dog.deselectDog();
          if (this.dogService.getSelectedDogId() === dog.getId()) {
            this.dogService.removeSelectedDogId();
          }
        }}
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

  onMouseEnter(dogId : number) {
    this.dogService.setSelectedDogId(dogId);
    this.dogService.selectFromList();
  }

  onMouseLeave() {
    this.dogService.unselectFromList();
    this.dogService.removeSelectedDogId();
    console.log('mouseleft')
  }

  getDogsFromService() {
    return this.dogService.dogs;
  }


}
