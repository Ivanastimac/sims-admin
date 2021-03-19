import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { OwnedPet } from '../ownedPet';
import { MemberService } from '../member.service';
import { Member } from '../member';
import { DialogChooseComponent } from '../dialog-choose/dialog-choose.component';
import { DialogNotParentComponent } from '../dialog-not-parent/dialog-not-parent.component';
import { DeletePetDialogComponent } from '../delete-pet-dialog/delete-pet-dialog.component';
import { PetDialogDto } from '../petDialogDto';

@Component({
  selector: 'app-owned-pet-dialog',
  templateUrl: './owned-pet-dialog.component.html',
  styleUrls: ['./owned-pet-dialog.component.css']
})

export class OwnedPetDialogComponent implements OnInit, OnDestroy {

  dialogPet: OwnedPet;
  chosenMember: Member;
  updatePetSub;
  afterClosedChooseSub;
  afterClosedNotParentSub;
  afterClosedDeleteSub;
  deletePetSub;
  sharedMemberSub;

  constructor(public dialogRef: MatDialogRef<OwnedPetDialogComponent>,
    public memberService: MemberService, 
    public dialogDelete: MatDialog,
    public dialogChoose: MatDialog,
    public dialogNotParent: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: OwnedPet) { 
      this.dialogPet = {...data};
    }

  ngOnInit(): void {
    this.sharedMemberSub = this.memberService.sharedMember.subscribe(chosenMember => this.chosenMember = chosenMember);
  }

  save(): void {
    let data: PetDialogDto = {pet: this.dialogPet, delete: false};
    this.dialogRef.disableClose = true;
    this.updatePetSub = this.memberService.updatePet(this.dialogPet).subscribe( result => {
      this.dialogRef.close({ data });
    }
    );
  }

  exit(): void {
    this.dialogRef.close();
  }

  openDialogDelete(): void {
    if (this.chosenMember.status === '') {
      this.chooseMember();
    } else if (this.chosenMember.status !== 'father' && this.chosenMember.status !== 'mother') {
        this.notParent();
    } else {
      const dialogRef = this.dialogDelete.open(DeletePetDialogComponent, {
        height: '120px',
        width: '400px',
      });

    this.afterClosedDeleteSub = dialogRef.afterClosed().subscribe(result =>
      {
        if (result && result.data === 'yes') {
            let data: PetDialogDto = { pet: this.dialogPet, delete: true };
            this.dialogRef.disableClose = true;
            this.deletePetSub = this.memberService.deletePet(this.dialogPet).subscribe( result => {
              this.dialogRef.close({ data });
              }
            );
          } else {
            this.dialogRef.close();
          }
        }
      )
    }
  }

  chooseMember(): void {
    const dialogRef = this.dialogChoose.open(DialogChooseComponent, {
      height: '120px',
      width: '400px',
    });

    this.afterClosedChooseSub = dialogRef.afterClosed().subscribe(result =>
      {
        this.dialogRef.close();
      }
    )
  }

  notParent(): void {
    const dialogRef = this.dialogNotParent.open(DialogNotParentComponent, {
      height: '140px',
      width: '400px',
    });

    this.afterClosedNotParentSub = dialogRef.afterClosed().subscribe(result =>
      {
        this.dialogRef.close();
      }
    )
  }

  ngOnDestroy(): void {
    if (this.sharedMemberSub) {
      this.sharedMemberSub.unsubscribe();
    }
    if (this.updatePetSub) {
      this.updatePetSub.unsubscribe();
    }
    if (this.afterClosedChooseSub) {
      this.afterClosedChooseSub.unsubscribe();
    }
    if (this.afterClosedNotParentSub) {
      this.afterClosedNotParentSub.unsubscribe();
    }
    if (this.afterClosedDeleteSub) {
      this.afterClosedDeleteSub.unsubscribe();
    }
    if (this.deletePetSub) {
      this.deletePetSub.unsubscribe();
    }
  }

}
