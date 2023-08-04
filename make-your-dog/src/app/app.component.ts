import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { ContainerComponent } from './Container/container.component';
import { DogFarmComponent } from './dog-farm/dog-farm.component';
import { Data, Routes } from '@angular/router';
import { DogEntry } from './dog-entry';
import { DogsService } from './services/dogs.service';

const routes : Routes = [
  {path : '', component: ContainerComponent},
  {path: 'farm', component: DogFarmComponent}
]

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DogsService]
})
export class AppComponent {
  
  title = 'make-your-dog';
  constructor(private dogService: DogsService) {
    
  }

}
