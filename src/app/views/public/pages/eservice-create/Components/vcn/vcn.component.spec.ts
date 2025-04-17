import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VCNComponent } from './vcn.component';

describe('VCNComponent', () => {
  let component: VCNComponent;
  let fixture: ComponentFixture<VCNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VCNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VCNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
