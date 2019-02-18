import { TestBed } from '@angular/core/testing';

import { LearnService } from './learn.service';

describe('LearnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearnService = TestBed.get(LearnService);
    expect(service).toBeTruthy();
  });
});
