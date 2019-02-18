import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnDetailsPage } from './learn-details.page';

describe('LearnDetailsPage', () => {
  let component: LearnDetailsPage;
  let fixture: ComponentFixture<LearnDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
