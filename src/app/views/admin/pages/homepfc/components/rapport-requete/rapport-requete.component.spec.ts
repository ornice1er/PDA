import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportRequeteComponent } from './rapport-requete.component';

describe('RapportRequeteComponent', () => {
  let component: RapportRequeteComponent;
  let fixture: ComponentFixture<RapportRequeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportRequeteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportRequeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
