import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmetricsrepoComponent } from './productmetricsrepo.component';

describe('ProductmetricsrepoComponent', () => {
  let component: ProductmetricsrepoComponent;
  let fixture: ComponentFixture<ProductmetricsrepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductmetricsrepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmetricsrepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
