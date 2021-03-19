import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNotParentComponent } from './dialog-not-parent.component';

describe('DialogNotParentComponent', () => {
  let component: DialogNotParentComponent;
  let fixture: ComponentFixture<DialogNotParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNotParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNotParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
