import { Component, Output, EventEmitter } from '@angular/core';
import { ContainerComponent } from '../Container/container.component';

@Component({
  selector: 'app-save-dog',
  templateUrl: './save-dog.component.html',
  styleUrls: ['./save-dog.component.css']
})
export class SaveDogComponent {
  dogName : string = '';
  @Output() saveDogEvent = new EventEmitter<string>();
  saveDog() {
    if (this.dogName != '') {
      this.saveDogEvent.emit(this.dogName);
    }
  }
}
