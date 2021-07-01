import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetokenComponent } from './updatetoken.component';

describe('UpdatetokenComponent', () => {
  let component: UpdatetokenComponent;
  let fixture: ComponentFixture<UpdatetokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatetokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
