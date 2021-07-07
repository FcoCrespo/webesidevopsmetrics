import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergithubopsComponent } from './usergithubops.component';

describe('UsergithubopsComponent', () => {
  let component: UsergithubopsComponent;
  let fixture: ComponentFixture<UsergithubopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergithubopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergithubopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
