import { Routes } from '@angular/router';
import { UsersPageComponent } from './features/users/users-page/users-page.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersPageComponent,
    title: 'Usuários'
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];
