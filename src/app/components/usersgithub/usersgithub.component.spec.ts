import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersgithubComponent } from './usersgithub.component';

describe('UsersgithubComponent', () => {
  let component: UsersgithubComponent;
  let fixture: ComponentFixture<UsersgithubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersgithubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersgithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
