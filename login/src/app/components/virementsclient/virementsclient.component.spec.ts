import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementsclientComponent } from './virementsclient.component';

describe('VirementsclientComponent', () => {
  let component: VirementsclientComponent;
  let fixture: ComponentFixture<VirementsclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirementsclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirementsclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
