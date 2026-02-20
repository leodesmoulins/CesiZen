import { TestBed } from '@angular/core/testing';

import { Diagnostic } from './diagnostic.service';

describe('Diagnostic', () => {
  let service: Diagnostic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Diagnostic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
