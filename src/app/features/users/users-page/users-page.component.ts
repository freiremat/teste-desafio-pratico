import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
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
export class UsersPageComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  private allUsers = signal<User[]>([]);

  filteredUsers = computed(() => {
    const query = this.usersService.searchQuery().toLowerCase();
    return this.allUsers().filter(user =>
      user.name.toLowerCase().includes(query)
    );
  });

  constructor(private usersService: UsersService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.usersService.getUsers().pipe(
      takeUntil(this.destroy$)
    ).subscribe(users => {
      this.allUsers.set([...users]);
    });
  }

  openCreate() {
    this.dialog.open(UserDialogComponent, { data: null, width: '600px' })
      .afterClosed().pipe(takeUntil(this.destroy$)).subscribe(saved => {
        if (saved) this.loadUsers();
      });
  }

  openEdit(user: User) {
    this.dialog.open(UserDialogComponent, { data: user, width: '600px' })
      .afterClosed().pipe(takeUntil(this.destroy$)).subscribe(saved => {
        if (saved) this.loadUsers();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
