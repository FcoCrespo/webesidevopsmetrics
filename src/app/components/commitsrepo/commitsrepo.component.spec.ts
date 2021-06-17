import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsrepoComponent } from './commitsrepo.component';

describe('CommitsrepoComponent', () => {
  let component: CommitsrepoComponent;
  let fixture: ComponentFixture<CommitsrepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsrepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsrepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
