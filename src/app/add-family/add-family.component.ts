import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-family',
  templateUrl: './add-family.component.html',
  styleUrls: ['./add-family.component.css']
})

export class AddFamilyComponent {

  family: string;

  constructor(public dialogRef: MatDialogRef<AddFamilyComponent>) { }

  save(): void {
    this.dialogRef.disableClose = true;
    this.dialogRef.close({ data: this.family });
  }

  exit(): void {
    this.dialogRef.close();
  }

}
