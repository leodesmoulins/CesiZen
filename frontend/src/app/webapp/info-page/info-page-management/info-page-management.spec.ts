import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPageManagement } from './info-page-management';

describe('InfoPageManagement', () => {
  let component: InfoPageManagement;
  let fixture: ComponentFixture<InfoPageManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoPageManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPageManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
