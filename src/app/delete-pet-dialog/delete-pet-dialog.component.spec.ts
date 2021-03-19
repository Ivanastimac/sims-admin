import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePetDialogComponent } from './delete-pet-dialog.component';

describe('DeletePetDialogComponent', () => {
  let component: DeletePetDialogComponent;
  let fixture: ComponentFixture<DeletePetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
