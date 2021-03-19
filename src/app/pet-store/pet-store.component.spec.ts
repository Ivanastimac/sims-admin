import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetStoreComponent } from './pet-store.component';

describe('PetStoreComponent', () => {
  let component: PetStoreComponent;
  let fixture: ComponentFixture<PetStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
