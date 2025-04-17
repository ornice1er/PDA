import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EserviceCreateComponent } from './eservice-create.component';

describe('EserviceCreateComponent', () => {
  let component: EserviceCreateComponent;
  let fixture: ComponentFixture<EserviceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EserviceCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EserviceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
