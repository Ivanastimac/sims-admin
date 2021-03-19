import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pet-dialog',
  templateUrl: './delete-pet-dialog.component.html',
  styleUrls: ['./delete-pet-dialog.component.css']
})

export class DeletePetDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeletePetDialogComponent>) { }

  save(): void {
    this.dialogRef.disableClose = true;
    this.dialogRef.close({ data: 'yes' });
  }

  exit(): void {
    this.dialogRef.close();
  }

}
