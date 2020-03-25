import { TestBed } from '@angular/core/testing';

import { StellarService } from './stellar.service';
import { UserService } from './providers';

describe('StellarService', () => {
  let userServiceSpy;
  beforeEach(() => {
    const subFn = { subscribe: () => {} };

    userServiceSpy = jasmine.createSpyObj('UserService', ['activeNetwork']);
    userServiceSpy.activeNetwork = jasmine.createSpyObj('activeNetwork', subFn);

    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();
  });

  it('should be created', () => {
    const service: StellarService = TestBed.get(StellarService);
    expect(service).toBeTruthy();
  });
});
