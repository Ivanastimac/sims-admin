import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedPetDialogComponent } from './owned-pet-dialog.component';

describe('OwnedPetDialogComponent', () => {
  let component: OwnedPetDialogComponent;
  let fixture: ComponentFixture<OwnedPetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnedPetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnedPetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
