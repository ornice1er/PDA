import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationItemComponent } from './prestation-item.component';

describe('PrestationItemComponent', () => {
  let component: PrestationItemComponent;
  let fixture: ComponentFixture<PrestationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestationItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
