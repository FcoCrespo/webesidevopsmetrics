import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepousersComponent } from './repousers.component';

describe('RepousersComponent', () => {
  let component: RepousersComponent;
  let fixture: ComponentFixture<RepousersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepousersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepousersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
