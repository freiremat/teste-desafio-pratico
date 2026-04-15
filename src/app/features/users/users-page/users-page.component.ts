import { Component, computed } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent {

  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  filteredUsers = computed(() => {
    const query = this.usersService.searchQuery().toLowerCase();
    return this.usersService.getUsers().filter(user =>
      user.name.toLowerCase().includes(query)
    );
  });

  openCreate() {
    this.dialog.open(UserDialogComponent, { data: null, width: '600px' });
  }

  openEdit(user: User) {
    this.dialog.open(UserDialogComponent, { data: user, width: '600px' });
  }
}
