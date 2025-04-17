import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VriComponent } from './vri.component';

describe('VriComponent', () => {
  let component: VriComponent;
  let fixture: ComponentFixture<VriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
