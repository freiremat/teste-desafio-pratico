import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { User, PhoneType } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, NgxMaskDirective],
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
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      phoneType: ['CELULAR'],
    });

    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  save() {
    if (this.form.invalid) return;
    if (this.isEditing) {
      this.usersService.updateUser({ ...this.form.value, id: this.data!.id });
      this.snackBar.open('Usuário atualizado com sucesso!', 'Fechar', { duration: 3000 });
    } else {
      this.usersService.addUser(this.form.value);
      this.snackBar.open('Usuário adicionado com sucesso!', 'Fechar', { duration: 3000 });
    }
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
