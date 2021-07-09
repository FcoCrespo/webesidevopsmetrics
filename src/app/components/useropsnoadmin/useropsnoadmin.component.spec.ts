import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseropsnoadminComponent } from './useropsnoadmin.component';

describe('UseropsnoadminComponent', () => {
  let component: UseropsnoadminComponent;
  let fixture: ComponentFixture<UseropsnoadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseropsnoadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseropsnoadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
