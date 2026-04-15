import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { UsersService } from './features/users/services/users.service';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

// Angular Material imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  pageTitle = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.routerState.snapshot.root.firstChild?.title ?? '')
    ),
    { initialValue: '' }
  );

  constructor(private readonly router: Router, private readonly usersService: UsersService) {}

  onSearch(value: string) {
    this.usersService.searchQuery.set(value);
  }
}