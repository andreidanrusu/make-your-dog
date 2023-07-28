import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ContainerComponent } from './Container/container.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { DrawingDirective } from './Container/drawing.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    NavigationBarComponent,
    DrawingDirective
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
