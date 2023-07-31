import { Component, AfterViewInit } from '@angular/core';
import { DogEntry } from '../dog-entry';

@Component({
  selector: 'app-dog-farm',
  templateUrl: './dog-farm.component.html',
  styleUrls: ['./dog-farm.component.css']
})
export class DogFarmComponent implements AfterViewInit {
  private dogs: DogEntry[] = [];
  
  ngAfterViewInit(): void {
  }
  
  addDogToFarm(dog : DogEntry) {
    this.dogs.push(dog);
    console.log(dog);
  }

}
