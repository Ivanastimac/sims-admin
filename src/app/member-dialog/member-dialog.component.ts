import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { Member } from '../member';
import { DialogDto } from '../dialogDto';
import { MemberService }  from '../member.service';
import { AddFamilyComponent } from '../add-family/add-family.component';
import { DeleteMemberComponent } from '../delete-member/delete-member.component';
import { DialogChooseComponent } from '../dialog-choose/dialog-choose.component';
import { DialogNotParentComponent } from '../dialog-not-parent/dialog-not-parent.component';


@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.css']
})

export class MemberDialogComponent implements OnInit, OnDestroy {

  dialogMember: Member;
  chosenMember: Member;
  member: Member;
  members: Member[];
  families: string[];
  type: String;
  updateMemberSub;
  addMemberSub;
  afterClosedAddSub;
  afterClosedDeleteSub;
  afterClosedChooseSub;
  afterClosedNotParentSub;
  sharedMemberSub;

  constructor(
    private memberService: MemberService,
    public dialogAdd: MatDialog,
    public dialogDelete: MatDialog,
    public dialogChoose: MatDialog,
    public dialogNotParent: MatDialog,
    public dialogRef: MatDialogRef<MemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDto)
    {

      this.dialogMember = {...data.member};
      this.type = data.type;
      this.members = data.members;
      this.families = data.families;

    }

  ngOnInit(): void {
    this.sharedMemberSub = this.memberService.sharedMember.subscribe(chosenMember => this.chosenMember = chosenMember);
  }

    save(): void {
      this.dialogRef.disableClose = true;
      if (this.type === 'update') {
        this.updateMemberSub = this.memberService.updateMember(this.dialogMember).subscribe( result => {
          this.dialogRef.close({ data: this.dialogMember });
        }
        );
      } else if (this.type === 'add') {
        if (this.chosenMember.status === '') {
          this.chooseMember();
        } else if (this.chosenMember.status !== 'father' && this.chosenMember.status !== 'mother') {
            this.notParent();
        } else {
          this.dialogMember.id = this.members.length;
          this.dialogMember.familyId = this.getFamilyId(this.dialogMember.surname);
          this.addMemberSub = this.memberService.addMember(this.dialogMember).subscribe( result => {
            this.dialogRef.close({ data: this.dialogMember });
          }
        );
      }
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

    getFamilyId(surname: String): number {
      let id = 0;
      for (let member of this.members) {
        if (member.surname === surname) {
          id = member.familyId;
          return id;
        } else if (member.familyId >= id) {
          id = member.familyId + 1;
        }
      }
      return id;
    }
  

    exit(): void {
      this.dialogRef.close();
    }

    openDialogAdd(): void {
      const dialogRef = this.dialogAdd.open(AddFamilyComponent, {
        height: '150px',
        width: '400px',
      });

      this.afterClosedAddSub = dialogRef.afterClosed().subscribe(result =>
        {
          if (result) {
            this.families.push(result.data);
          }
        }
      )
    }

    openDialogDelete(): void {
      if (this.chosenMember.status === '') {
        this.chooseMember();
      } else if (this.chosenMember.status !== 'father' && this.chosenMember.status !== 'mother') {
          this.notParent();
      } else {
        const dialogRef = this.dialogDelete.open(DeleteMemberComponent, {
          height: '140px',
          width: '400px',
        });

        this.afterClosedDeleteSub = dialogRef.afterClosed().subscribe(result =>
          {
            if (result) {
              this.dialogRef.disableClose = true;
              this.dialogMember.reasonOfRemoval = result.data;
              this.updateMemberSub = this.memberService.updateMember(this.dialogMember).subscribe( result => {
                this.dialogRef.close({ data: this.dialogMember });
                }
              );
            }
          }
        )
      }
    }

    ngOnDestroy(): void {
      if (this.sharedMemberSub) {
        this.sharedMemberSub.unsubscribe();
      }
      if (this.updateMemberSub) {
        this.updateMemberSub.unsubscribe();
      }
      if (this.addMemberSub) {
        this.addMemberSub.unsubscribe();
      }     
      if (this.afterClosedAddSub) {
        this.afterClosedAddSub.unsubscribe();
      }  
      if (this.afterClosedDeleteSub) {
        this.afterClosedDeleteSub.unsubscribe();
      } 
      if (this.afterClosedChooseSub) {
        this.afterClosedChooseSub.unsubscribe();
      }   
      if (this.afterClosedNotParentSub) {
        this.afterClosedNotParentSub.unsubscribe();
      }           
    }

}