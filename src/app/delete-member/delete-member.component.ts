import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.css']
})

export class DeleteMemberComponent {

  reason: string = '';

  constructor(public dialogRef: MatDialogRef<DeleteMemberComponent>) { }

  save(): void {
    this.dialogRef.disableClose = true;
    this.dialogRef.close({data: this.reason});
  }

  exit(): void {
    this.dialogRef.close();
  }

}
