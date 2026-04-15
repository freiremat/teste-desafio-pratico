import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@example.com'
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      email: 'maria.oliveira@example.com'
    },
    {
      id: 3,
      name: 'Carlos Souza',
      email: 'carlos.souza@example.com'
    }
  ];

  constructor() { }

  getUsers() {
    return this.users;
  }
}