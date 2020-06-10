import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAuditsComponent } from './all-audits.component';

describe('AllAuditsComponent', () => {
  let component: AllAuditsComponent;
  let fixture: ComponentFixture<AllAuditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAuditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
