import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-not-parent',
  templateUrl: './dialog-not-parent.component.html',
  styleUrls: ['./dialog-not-parent.component.css']
})

export class DialogNotParentComponent {

  constructor(public dialogRef: MatDialogRef<DialogNotParentComponent>) { }

  exit(): void {
    this.dialogRef.close();
  }

}
