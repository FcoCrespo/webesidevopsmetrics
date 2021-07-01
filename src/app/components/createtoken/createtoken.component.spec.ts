import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetokenComponent } from './createtoken.component';

describe('CreatetokenComponent', () => {
  let component: CreatetokenComponent;
  let fixture: ComponentFixture<CreatetokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatetokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
