import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfcMataccueilComponent } from './pfc-mataccueil.component';

describe('PfcMataccueilComponent', () => {
  let component: PfcMataccueilComponent;
  let fixture: ComponentFixture<PfcMataccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfcMataccueilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfcMataccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
