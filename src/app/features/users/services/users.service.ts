import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  searchQuery = signal('');

  private users: User[] = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@example.com',
      cpf: '123.456.789-00',
      phone: '(11) 99999-0001',
      phoneType: 'CELULAR'
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      cpf: '234.567.890-00',
      phone: '(11) 99999-0002',
      phoneType: 'CELULAR'
    },
    {
      id: 3,
      name: 'Carlos Souza',
      email: 'carlos.souza@example.com',
      cpf: '345.678.901-00',
      phone: '(11) 99999-0003',
      phoneType: 'RESIDENCIAL'
    },
  ];

  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}