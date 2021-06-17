import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseropsComponent } from './userops.component';

describe('UseropsComponent', () => {
  let component: UseropsComponent;
  let fixture: ComponentFixture<UseropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
