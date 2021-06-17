import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesrepoComponent } from './issuesrepo.component';

describe('IssuesrepoComponent', () => {
  let component: IssuesrepoComponent;
  let fixture: ComponentFixture<IssuesrepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuesrepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesrepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
