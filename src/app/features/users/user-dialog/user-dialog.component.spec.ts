import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDialogComponent } from './user-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../services/users.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';

describe('UserDialogComponent', () => {
  let component: UserDialogComponent;
  let fixture: ComponentFixture<UserDialogComponent>;
  
  const mockDialogRef = { close: jest.fn() };
  const mockSnackBar = { open: jest.fn() };
  const mockUsersService = { 
    addUser: jest.fn(), 
    updateUser: jest.fn() 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserDialogComponent, 
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: UsersService, useValue: mockUsersService },
        { provide: MAT_DIALOG_DATA, useValue: null },
        provideNgxMask()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar o formulário vazio quando for criação', () => {
    expect(component.isEditing).toBeFalsy();
    expect(component.form.value.name).toBe('');
  });

  it('deve validar o formulário como inválido se estiver vazio', () => {
    component.form.patchValue({ name: '', email: '' });
    expect(component.form.invalid).toBeTruthy();
  });

  it('deve chamar addUser quando o formulário for válido e não estiver editando', () => {
    const userData = {
      name: 'Matheus',
      email: 'matheus@teste.com',
      cpf: '123.456.789-01',
      phone: '(16) 99999-9999',
      phoneType: 'CELULAR'
    };

    component.form.patchValue(userData);
    component.save();

    expect(mockUsersService.addUser).toHaveBeenCalledWith(userData);
    expect(mockSnackBar.open).toHaveBeenCalledWith(expect.stringContaining('adicionado'), 'Fechar', expect.any(Object));
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('deve fechar o diálogo ao clicar no botão close', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});