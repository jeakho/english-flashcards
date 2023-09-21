import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsControlComponent } from './cards-control.component';

describe('CardsControlComponent', () => {
  let component: CardsControlComponent;
  let fixture: ComponentFixture<CardsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsControlComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
