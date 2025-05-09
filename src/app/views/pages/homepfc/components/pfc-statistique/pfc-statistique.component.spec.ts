import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfcStatistiqueComponent } from './pfc-statistique.component';

describe('PfcStatistiqueComponent', () => {
  let component: PfcStatistiqueComponent;
  let fixture: ComponentFixture<PfcStatistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfcStatistiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfcStatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
