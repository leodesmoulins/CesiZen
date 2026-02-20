import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticHistory } from './diagnostic-history';

describe('DiagnosticHistory', () => {
  let component: DiagnosticHistory;
  let fixture: ComponentFixture<DiagnosticHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
