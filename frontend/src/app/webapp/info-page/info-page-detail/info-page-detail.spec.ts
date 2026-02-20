import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPageDetail } from './info-page-detail';

describe('InfoPageDetail', () => {
  let component: InfoPageDetail;
  let fixture: ComponentFixture<InfoPageDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoPageDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPageDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
