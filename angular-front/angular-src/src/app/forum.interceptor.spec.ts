import { TestBed } from '@angular/core/testing';

import { ForumInterceptor } from './forum.interceptor';

describe('ForumInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ForumInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ForumInterceptor = TestBed.inject(ForumInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
