import { Component, OnInit, OnDestroy } from '@angular/core';
import { AllowedPet } from '../allowedPet';
import { MemberService } from '../member.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAllowedPetComponent } from '../dialog-allowed-pet/dialog-allowed-pet.component';

@Component({
  selector: 'app-pet-store',
  templateUrl: './pet-store.component.html',
  styleUrls: ['./pet-store.component.css']
})

export class PetStoreComponent implements OnInit, OnDestroy {

  allowedPets: AllowedPet[];
  allowedPetsSub;
  afterClosedSub;

  constructor( private memberService: MemberService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.allowedPetsSub = this.memberService.getAllowedPets().subscribe(pets => this.allowedPets = pets);
  }

  openDialog(pet: AllowedPet): void {

    const dialogRef = this.dialog.open(DialogAllowedPetComponent, {
      height: '300px',
      width: '600px',
      data: pet
    });

    this.afterClosedSub = dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy(): void {
    this.allowedPetsSub.unsubscribe();
    if (this.afterClosedSub) {
      this.afterClosedSub.unsubscribe();
    }
  }

}
