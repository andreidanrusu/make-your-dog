import { Component, AfterViewInit } from '@angular/core';
import { DogEntry } from '../dog-entry';
import { animate, animation, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dog-farm',
  templateUrl: './dog-farm.component.html',
  styleUrls: ['./dog-farm.component.css'],
  animations: [
    trigger('moveDiv', [
      state('moving', style({
        transform : 'translateX(10px)'
      })),
      transition ('* => moving', animate('500ms')),
      state('staying',style([]))
  ])
  ]
})
export class DogFarmComponent{
  dogs: DogEntry[] = [{name:"dog",image:""}];
  private interval: any;
  private interval1: any;

  state:string = 'staying';

  constructor() {
    this.interval = setInterval(() => 
    {
      this.moveRandomly();
    }, 1000);

    this.interval = setInterval(() => 
    {
      this.stop();
    }, 2000);
  }

  
  addDogToFarm(dog : DogEntry) {
    this.dogs.push(dog);
  }

  getRandomInt(min: number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  moveRandomly() {
    this.state = 'moving';
  }
  
  stop() {
    this.state = 'staying';
  }



}
