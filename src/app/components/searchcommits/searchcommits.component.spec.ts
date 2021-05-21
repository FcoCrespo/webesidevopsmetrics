import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchcommitsComponent } from './searchcommits.component';

describe('SearchcommitsComponent', () => {
  let component: SearchcommitsComponent;
  let fixture: ComponentFixture<SearchcommitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchcommitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchcommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
