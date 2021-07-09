import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsrepodevComponent } from './commitsrepodev.component';

describe('CommitsrepodevComponent', () => {
  let component: CommitsrepodevComponent;
  let fixture: ComponentFixture<CommitsrepodevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsrepodevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsrepodevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
