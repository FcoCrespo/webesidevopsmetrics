import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestmetricsrepoComponent } from './testmetricsrepo.component';

describe('TestmetricsrepoComponent', () => {
  let component: TestmetricsrepoComponent;
  let fixture: ComponentFixture<TestmetricsrepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestmetricsrepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestmetricsrepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
