import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPageList } from './info-page-list';

describe('InfoPageList', () => {
  let component: InfoPageList;
  let fixture: ComponentFixture<InfoPageList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoPageList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPageList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
