import { TestBed } from '@angular/core/testing';

import { FacturesService } from './facture.service';

describe('FacturesService', () => {
  let service: FacturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
