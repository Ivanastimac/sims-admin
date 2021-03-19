import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { OwnedPet } from '../ownedPet';
import { MemberService }  from '../member.service';
import { OwnedPetDialogComponent } from '../owned-pet-dialog/owned-pet-dialog.component';
import { PetDialogDto } from '../petDialogDto';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})

export class PetsComponent implements OnInit, OnDestroy {

  ownedPets: OwnedPet[] = [];
  displayedColumns: string[] = ['name', 'breed', 'age', 'familyId'];
  families: string[] = [];
  getOwnedPetsSub;
  sharedFamiliesSub;
  afterClosedSub;

  @ViewChild('table') table: MatTable<OwnedPet>;

  constructor(private memberService: MemberService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOwnedPets();
    this.sharedFamiliesSub = this.memberService.sharedFamilies.subscribe(families => this.families = families);
  }

  getOwnedPets(): void {
    this.getOwnedPetsSub = this.memberService.sharedOwnedPets.subscribe(ownedPets => {
     this.ownedPets = ownedPets;
     if (ownedPets.length == 0) {
       this.memberService.getOwnedPets().subscribe(ownedPets => this.ownedPets = ownedPets);
     }
    });
  }

  openDialog(pet: OwnedPet): void {

    const dialogRef = this.dialog.open(OwnedPetDialogComponent, {
      height: '250px',
      width: '600px',
      data: pet
    });

    this.afterClosedSub = dialogRef.afterClosed().subscribe(result =>
      {
        if (result) {
          let data: PetDialogDto = result.data;
          if (data.delete) {
            let id = data.pet.id;
            this.ownedPets = this.ownedPets.filter(pet => pet.id !== id);
          } else {
            this.ownedPets[data.pet.id] = data.pet;
          }
          this.table.dataSource = this.ownedPets;
          this.table.renderRows();
        }
      }
    )

  }

  ngOnDestroy(): void {
    if (this.getOwnedPetsSub) {
      this.getOwnedPetsSub.unsubscribe();
    }
    if (this.sharedFamiliesSub) {
      this.sharedFamiliesSub.unsubscribe();
    }
    if (this.afterClosedSub) {
      this.afterClosedSub.unsubscribe();
    }
  }

}
