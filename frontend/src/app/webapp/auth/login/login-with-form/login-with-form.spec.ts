import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithForm } from './login-with-form';

describe('LoginWithForm', () => {
  let component: LoginWithForm;
  let fixture: ComponentFixture<LoginWithForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginWithForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWithForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
