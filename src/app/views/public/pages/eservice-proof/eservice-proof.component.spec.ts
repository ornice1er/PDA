import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EserviceProofComponent } from './eservice-proof.component';

describe('EserviceProofComponent', () => {
  let component: EserviceProofComponent;
  let fixture: ComponentFixture<EserviceProofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EserviceProofComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EserviceProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
