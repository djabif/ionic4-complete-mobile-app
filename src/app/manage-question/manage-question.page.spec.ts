import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuestionPage } from './manage-question.page';

describe('ManageQuestionPage', () => {
  let component: ManageQuestionPage;
  let fixture: ComponentFixture<ManageQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageQuestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
