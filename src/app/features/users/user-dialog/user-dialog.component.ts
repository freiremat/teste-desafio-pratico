import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { User, PhoneType } from '../models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './user-dialog.component.html',
})
export class UserDialogComponent implements OnInit {

  form!: FormGroup;
  phoneTypes: PhoneType[] = ['CELULAR', 'RESIDENCIAL'];

  get isEditing() {
    return this.data !== null;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      phoneType: ['CELULAR'],
    });

    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
