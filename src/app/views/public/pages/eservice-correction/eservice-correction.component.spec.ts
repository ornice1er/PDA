import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EserviceCorrectionComponent } from './eservice-correction.component';

describe('EserviceCorrectionComponent', () => {
  let component: EserviceCorrectionComponent;
  let fixture: ComponentFixture<EserviceCorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EserviceCorrectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EserviceCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
