import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { UsersPageComponent } from './users-page.component';

describe('UsersPageComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve cancelar as inscrições (unsubscribe) e encerrar os subjects ao destruir o componente', () => {
    const destroyNextSpy = jest.spyOn((component as any).destroy$, 'next');
    const destroyCompleteSpy = jest.spyOn((component as any).destroy$, 'complete');

    component.ngOnDestroy();

    expect(destroyNextSpy).toHaveBeenCalled();
    expect(destroyCompleteSpy).toHaveBeenCalled();
  });
});
