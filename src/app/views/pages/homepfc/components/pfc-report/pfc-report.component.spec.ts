import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfcReportComponent } from './pfc-report.component';

describe('PfcReportComponent', () => {
  let component: PfcReportComponent;
  let fixture: ComponentFixture<PfcReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfcReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfcReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
