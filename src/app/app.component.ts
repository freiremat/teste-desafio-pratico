import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { UsersService } from './features/users/services/users.service';
import { Subject } from 'rxjs';
import { filter, map, debounceTime, switchMap, takeUntil } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

// Angular Material imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatTooltipModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  pageTitle = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.routerState.snapshot.root.firstChild?.title ?? '')
    ),
    { initialValue: '' }
  );

  constructor(private readonly router: Router, private readonly usersService: UsersService) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(query => this.usersService.getUsers().pipe(
        map(() => query)
      )),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.usersService.searchQuery.set(query);
    });
  }

  onSearch(value: string) {
    this.searchSubject.next(value);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
