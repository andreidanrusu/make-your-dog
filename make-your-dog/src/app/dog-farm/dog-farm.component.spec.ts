import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogFarmComponent } from './dog-farm.component';

describe('DogFarmComponent', () => {
  let component: DogFarmComponent;
  let fixture: ComponentFixture<DogFarmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DogFarmComponent]
    });
    fixture = TestBed.createComponent(DogFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
