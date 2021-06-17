import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryinfoComponent } from './repositoryinfo.component';

describe('RepositoryinfoComponent', () => {
  let component: RepositoryinfoComponent;
  let fixture: ComponentFixture<RepositoryinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
