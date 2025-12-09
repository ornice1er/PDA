import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateClosedComponent } from './date-closed.component';

describe('DateClosedComponent', () => {
  let component: DateClosedComponent;
  let fixture: ComponentFixture<DateClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateClosedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
