import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { AllowedPet } from '../allowedPet';
import { OwnedPet } from '../ownedPet';
import { MemberService } from '../member.service';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { Member } from '../member';
import { DialogChooseComponent } from '../dialog-choose/dialog-choose.component';

@Component({
  selector: 'app-dialog-allowed-pet',
  templateUrl: './dialog-allowed-pet.component.html',
  styleUrls: ['./dialog-allowed-pet.component.css']
})
export class DialogAllowedPetComponent implements OnInit, OnDestroy {

  ownedPets: OwnedPet[];
  chosenMember: Member;
  message: string;
  ownedPetsSub;
  afterClosedMessageSub;
  afterClosedChooseSub;

  constructor(public dialogRef: MatDialogRef<DialogAllowedPetComponent>,
    public memberService: MemberService,
    public dialogMessage: MatDialog,
    public dialogChoose: MatDialog,
    @Inject(MAT_DIALOG_DATA) public pet: AllowedPet)  { }

  ngOnInit(): void {
    this.ownedPetsSub = this.memberService.sharedOwnedPets.subscribe(ownedPets => {
      this.ownedPets = ownedPets;
      if (ownedPets.length == 0) {
        this.memberService.getOwnedPets().subscribe(ownedPets => this.ownedPets = ownedPets);
      }
     });
  }

  adopt(): void {
    this.memberService.sharedMember.subscribe(chosenMember => this.chosenMember = chosenMember);
    if (this.chosenMember.status === '') {
      this.chooseMember();
    } else if (this.numberOfPets(this.chosenMember.familyId) == 2) {
      this.message = "You already have two pets!";
      this.sendMessage(this.message); 
    } else {
      let fid = this.chosenMember.familyId;
      let id: number = this.ownedPets.length;
      let pet: OwnedPet = { name: this.pet.name, id: id, breed: this.pet.breed, age: this.pet.age, familyId: fid };
      this.ownedPets.push(pet);
      this.memberService.setOwnedPets(this.ownedPets);
      this.memberService.adoptPet(pet).subscribe();
      this.message = "You successfully adopted a pet!";
      this.sendMessage(this.message); 
    }
  }

  sendMessage(message: string): void {
    const dialogRef = this.dialogMessage.open(DialogMessageComponent, {
      height: '120px',
      width: '400px',
      data: message
    });
    this.afterClosedMessageSub = dialogRef.afterClosed().subscribe(result =>
      {
        this.dialogRef.close();
      }
    )
  }

  numberOfPets(family: number): number {
    let num = 0;
    for (let pet of this.ownedPets) {
      if (pet.familyId == family) {
        ++num;
      }
    }
    return num;
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

  ngOnDestroy(): void {
    this.ownedPetsSub.unsubscribe();
    if (this.afterClosedMessageSub) {
      this.afterClosedMessageSub.unsubscribe();
    }
    if (this.afterClosedChooseSub) {
      this.afterClosedChooseSub.unsubscribe();
    }
  }

}
