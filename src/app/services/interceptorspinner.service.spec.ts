import { TestBed } from '@angular/core/testing';

import { InterceptorspinnerService } from './interceptorspinner.service';

describe('InterceptorspinnerService', () => {
  let service: InterceptorspinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorspinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
