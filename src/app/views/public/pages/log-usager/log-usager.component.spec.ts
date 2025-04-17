import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogUsagerComponent } from './log-usager.component';

describe('LogUsagerComponent', () => {
  let component: LogUsagerComponent;
  let fixture: ComponentFixture<LogUsagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LogUsagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogUsagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
