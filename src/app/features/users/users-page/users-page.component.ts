import { Component, computed } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent {

  constructor(private usersService: UsersService) { }

  filteredUsers = computed(() => {
    const query = this.usersService.searchQuery().toLowerCase();
    return this.usersService.getUsers().filter(user =>
      user.name.toLowerCase().includes(query)
    );
  });
}
