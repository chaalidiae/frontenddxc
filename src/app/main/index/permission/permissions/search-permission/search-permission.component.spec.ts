import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPermissionComponent } from './search-permission.component';

describe('SearchPermissionComponent', () => {
  let component: SearchPermissionComponent;
  let fixture: ComponentFixture<SearchPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
