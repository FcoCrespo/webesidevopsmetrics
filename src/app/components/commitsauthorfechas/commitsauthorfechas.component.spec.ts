import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsauthorfechasComponent } from './commitsauthorfechas.component';

describe('CommitsauthorfechasComponent', () => {
  let component: CommitsauthorfechasComponent;
  let fixture: ComponentFixture<CommitsauthorfechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsauthorfechasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsauthorfechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
