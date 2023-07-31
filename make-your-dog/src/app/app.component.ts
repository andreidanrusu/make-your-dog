import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { ContainerComponent } from './Container/container.component';
import { DogFarmComponent } from './dog-farm/dog-farm.component';
import { Data } from '@angular/router';
import { DogEntry } from './dog-entry';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'make-your-dog';

  dogsName : string = '';

  @ViewChild(ContainerComponent,{static: false}) canvasComponent?: ContainerComponent;
  @ViewChild(DogFarmComponent, {static: false}) dogFarmComponent? : DogFarmComponent;

  sendDogToFarm(entry : DogEntry){
    if (entry.name != '' && entry.image != '') {
      this.dogFarmComponent?.addDogToFarm(entry);
    }
  }

  sendDog(name : string) {
    this.dogsName = name;    
    if (this.canvasComponent) {
      this.canvasComponent.saveCanvas(this.dogsName);
      console.log("parent component saveDOg()")
    }
  }


}
