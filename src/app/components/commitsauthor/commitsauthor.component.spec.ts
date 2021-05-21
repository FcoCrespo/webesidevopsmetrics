import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsauthorComponent } from './commitsauthor.component';

describe('CommitsauthorComponent', () => {
  let component: CommitsauthorComponent;
  let fixture: ComponentFixture<CommitsauthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsauthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsauthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
