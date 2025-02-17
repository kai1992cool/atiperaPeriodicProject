import { Component, Inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-from-popup',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './from-popup.component.html',
  styleUrl: './from-popup.component.scss'
})
export class FromPopupComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FromPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      position: new FormControl(this.data?.position || 0, [Validators.required]),
      name: new FormControl(this.data?.name || '', [Validators.required]),
      weight: new FormControl(this.data?.weight || 0, [Validators.required, Validators.min(0)]),
      symbol: new FormControl(this.data?.symbol || '', [Validators.required])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
     this.dialogRef.close(this.form.value);
  }

}
