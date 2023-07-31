import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDogComponent } from './save-dog.component';

describe('SaveDogComponent', () => {
  let component: SaveDogComponent;
  let fixture: ComponentFixture<SaveDogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveDogComponent]
    });
    fixture = TestBed.createComponent(SaveDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
