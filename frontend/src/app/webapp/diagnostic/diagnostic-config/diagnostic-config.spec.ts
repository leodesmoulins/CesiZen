import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticConfig } from './diagnostic-config';

describe('DiagnosticConfig', () => {
  let component: DiagnosticConfig;
  let fixture: ComponentFixture<DiagnosticConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
