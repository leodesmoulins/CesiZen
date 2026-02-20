import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticQuestionManagement } from './diagnostic-question-management';

describe('DiagnosticQuestionManagement', () => {
  let component: DiagnosticQuestionManagement;
  let fixture: ComponentFixture<DiagnosticQuestionManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticQuestionManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticQuestionManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
