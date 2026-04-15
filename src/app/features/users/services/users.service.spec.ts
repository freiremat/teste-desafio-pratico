import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { User } from '../models/user.model';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar a lista inicial de usuários via Observable', (done) => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(3);
      expect(users[0].name).toBe('João Silva');
      done();
    });
  });

  it('deve adicionar um novo usuário e atribuir um ID', (done) => {
    const newUser: User = {
      name: 'Matheus Teste',
      email: 'matheus@teste.com',
      cpf: '000.000.000-00',
      phone: '(16) 99999-9999',
      phoneType: 'CELULAR'
    };

    service.addUser(newUser);

    service.getUsers().subscribe(users => {
      const addedUser = users.find(u => u.name === 'Matheus Teste');
      expect(addedUser).toBeTruthy();
      expect(addedUser?.id).toBe(4);
      done();
    });
  });

  it('deve atualizar um usuário existente', (done) => {
    const updatedUser: User = {
      id: 1,
      name: 'João Silva Editado',
      email: 'joao.editado@example.com',
      cpf: '123.456.789-00',
      phone: '(11) 99999-0001',
      phoneType: 'CELULAR'
    };

    service.updateUser(updatedUser);

    service.getUsers().subscribe(users => {
      const user = users.find(u => u.id === 1);
      expect(user?.name).toBe('João Silva Editado');
      done();
    });
  });

  it('não deve quebrar ao tentar atualizar um usuário com ID inexistente', (done) => {
    const invalidUser: User = {
      id: 99,
      name: 'Fantasma',
      email: '',
      cpf: '',
      phone: '',
      phoneType: 'CELULAR'
    };

    service.updateUser(invalidUser);

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(3);
      done();
    });
  });

  it('deve atualizar o valor do searchQuery signal', () => {
    const termoBusca = 'Maria';
    service.searchQuery.set(termoBusca);
    expect(service.searchQuery()).toBe(termoBusca);
  });
});