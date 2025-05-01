import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfcWhatsappComponent } from './pfc-whatsapp.component';

describe('PfcWhatsappComponent', () => {
  let component: PfcWhatsappComponent;
  let fixture: ComponentFixture<PfcWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfcWhatsappComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfcWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
