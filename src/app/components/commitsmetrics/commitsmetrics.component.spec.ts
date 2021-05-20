import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsmetricsComponent } from './commitsmetrics.component';

describe('CommitsmetricsComponent', () => {
  let component: CommitsmetricsComponent;
  let fixture: ComponentFixture<CommitsmetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsmetricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsmetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
