import { TestBed } from '@angular/core/testing';

import { MataccueilService } from './mataccueil.service';

describe('MataccueilService', () => {
  let service: MataccueilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MataccueilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
