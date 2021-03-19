import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAllowedPetComponent } from './dialog-allowed-pet.component';

describe('DialogAllowedPetComponent', () => {
  let component: DialogAllowedPetComponent;
  let fixture: ComponentFixture<DialogAllowedPetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAllowedPetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAllowedPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
