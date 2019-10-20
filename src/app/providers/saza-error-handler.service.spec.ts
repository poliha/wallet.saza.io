import { TestBed } from '@angular/core/testing';

import { SazaErrorHandler } from './saza-error-handler.service';

describe('SazaErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SazaErrorHandler = TestBed.get(SazaErrorHandler);
    expect(service).toBeTruthy();
  });
});
