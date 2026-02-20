import { TestBed } from '@angular/core/testing';

import { DiagnosticAdmin } from './diagnostic-admin.service';

describe('DiagnosticAdmin', () => {
  let service: DiagnosticAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
