import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UsersService } from './features/users/services/users.service';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('AppComponent', () => {
  let fixture: any;
  let component: AppComponent;
  let usersServiceMock: any;

  beforeEach(async () => {
    usersServiceMock = {
      getUsers: jest.fn().mockReturnValue(of([])),
      searchQuery: signal('')
    };

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BrowserAnimationsModule
      ],
      providers: [
        provideRouter([]),
        { provide: UsersService, useValue: usersServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  it('Não deve chamar o getUsers imediatamente após o onSearch', fakeAsync(() => {
    fixture.detectChanges();

    component.onSearch('Matheus');

    tick(100);
    expect(usersServiceMock.getUsers).not.toHaveBeenCalled();

    tick(200);
  }));

  it('Deve chamar o getUsers e atualizar o signal após 300ms', fakeAsync(() => {
    fixture.detectChanges();

    const signalSetSpy = jest.spyOn(usersServiceMock.searchQuery, 'set');

    component.onSearch('Matheus');

    tick(300);

    expect(usersServiceMock.getUsers).toHaveBeenCalled();
    expect(signalSetSpy).toHaveBeenCalledWith('Matheus');
  }));

  it('Deve executar apenas a última chamada quando múltiplas buscas ocorrerem', fakeAsync(() => {
    fixture.detectChanges();

    component.onSearch('M');
    tick(100);
    component.onSearch('Ma');
    tick(100);
    component.onSearch('Matheus');

    tick(300);

    expect(usersServiceMock.getUsers).toHaveBeenCalledTimes(1);
    expect(usersServiceMock.searchQuery()).toBe('Matheus');
  }));

  it('Deve cancelar as inscrições (unsubscribe) e encerrar os subjects ao destruir o componente', () => {
    const destroyNextSpy = jest.spyOn((component as any).destroy$, 'next');
    const destroyCompleteSpy = jest.spyOn((component as any).destroy$, 'complete');

    component.ngOnDestroy();

    expect(destroyNextSpy).toHaveBeenCalled();
    expect(destroyCompleteSpy).toHaveBeenCalled();
  });

});