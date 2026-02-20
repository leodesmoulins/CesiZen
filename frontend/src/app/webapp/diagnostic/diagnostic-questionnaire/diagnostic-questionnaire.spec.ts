import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticQuestionnaire } from './diagnostic-questionnaire';

describe('DiagnosticQuestionnaire', () => {
  let component: DiagnosticQuestionnaire;
  let fixture: ComponentFixture<DiagnosticQuestionnaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticQuestionnaire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticQuestionnaire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
