import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAuditsComponent } from './search-audits.component';

describe('SearchAuditsComponent', () => {
  let component: SearchAuditsComponent;
  let fixture: ComponentFixture<SearchAuditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAuditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
