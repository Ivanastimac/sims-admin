import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChooseComponent } from './dialog-choose.component';

describe('DialogChooseComponent', () => {
  let component: DialogChooseComponent;
  let fixture: ComponentFixture<DialogChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
