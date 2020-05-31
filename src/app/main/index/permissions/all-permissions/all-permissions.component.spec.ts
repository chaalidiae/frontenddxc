import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPermissionsComponent } from './all-permissions.component';

describe('AllPermissionsComponent', () => {
  let component: AllPermissionsComponent;
  let fixture: ComponentFixture<AllPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
