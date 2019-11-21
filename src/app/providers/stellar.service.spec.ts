import { TestBed } from '@angular/core/testing';

import { StellarService } from './stellar.service';

describe('StellarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StellarService = TestBed.get(StellarService);
    expect(service).toBeTruthy();
  });
});
