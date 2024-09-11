import { Component, Inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-from-popup',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './from-popup.component.html',
  styleUrl: './from-popup.component.scss'
})
export class FromPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<FromPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data); // Return updated data
  }

}
