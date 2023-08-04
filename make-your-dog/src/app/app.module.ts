import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContainerComponent } from './Container/container.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { DrawingDirective } from './Container/drawing.directive';
import { DogFarmComponent } from './dog-farm/dog-farm.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    NavigationBarComponent,
    DrawingDirective,
    DogFarmComponent,
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
