import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoopsComponent } from './repoops.component';

describe('RepoopsComponent', () => {
  let component: RepoopsComponent;
  let fixture: ComponentFixture<RepoopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
