import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-choose',
  templateUrl: './dialog-choose.component.html',
  styleUrls: ['./dialog-choose.component.css']
})

export class DialogChooseComponent {

  constructor(public dialogRef: MatDialogRef<DialogChooseComponent>) { }

  exit(): void {
    this.dialogRef.close();
  }

}
