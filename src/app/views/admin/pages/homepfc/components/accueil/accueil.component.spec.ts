import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfcAccueilComponent } from './accueil.component';

describe('PfcAccueilComponent', () => {
  let component: PfcAccueilComponent;
  let fixture: ComponentFixture<PfcAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfcAccueilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfcAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
