import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EseriveStatusComponent } from './eserive-status.component';

describe('EseriveStatusComponent', () => {
  let component: EseriveStatusComponent;
  let fixture: ComponentFixture<EseriveStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EseriveStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EseriveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
