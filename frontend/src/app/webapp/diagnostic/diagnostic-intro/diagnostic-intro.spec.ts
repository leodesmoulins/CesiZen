import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticIntro } from './diagnostic-intro';

describe('DiagnosticIntro', () => {
  let component: DiagnosticIntro;
  let fixture: ComponentFixture<DiagnosticIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticIntro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticIntro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
