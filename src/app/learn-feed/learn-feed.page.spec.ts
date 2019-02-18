import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnFeedPage } from './learn-feed.page';

describe('LearnFeedPage', () => {
  let component: LearnFeedPage;
  let fixture: ComponentFixture<LearnFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnFeedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
