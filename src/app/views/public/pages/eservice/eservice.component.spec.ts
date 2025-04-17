import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EserviceComponent } from './eservice.component';

describe('EserviceComponent', () => {
  let component: EserviceComponent;
  let fixture: ComponentFixture<EserviceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
