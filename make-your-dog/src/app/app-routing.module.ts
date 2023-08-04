import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './Container/container.component';
import { DogFarmComponent } from './dog-farm/dog-farm.component';

const routes: Routes = [
  { path: '', component: ContainerComponent },
  { path: 'farm', component: DogFarmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
