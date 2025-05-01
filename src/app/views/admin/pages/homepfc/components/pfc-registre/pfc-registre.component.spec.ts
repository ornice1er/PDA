import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfcRegistreComponent } from './pfc-registre.component';

describe('PfcRegistreComponent', () => {
  let component: PfcRegistreComponent;
  let fixture: ComponentFixture<PfcRegistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfcRegistreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfcRegistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
