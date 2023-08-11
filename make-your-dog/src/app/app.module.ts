import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { Routes, RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';

import { AppComponent } from './app.component';
import { ContainerComponent } from './Container/container.component';
import { DrawingDirective } from './Container/drawing.directive';
import { DogFarmComponent } from './dog-farm/dog-farm.component';
import { AppRoutingModule } from './app-routing.module';
import { MouseInteractionsDirective } from './dog-farm/directives/mouse-interactions.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    DrawingDirective,
    DogFarmComponent,
    MouseInteractionsDirective,
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    AppRoutingModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
