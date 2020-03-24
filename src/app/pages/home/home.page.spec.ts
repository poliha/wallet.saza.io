import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomePage } from './home.page';
import { UserService } from 'src/app/providers/providers';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let userServiceSpy;

  beforeEach(async(() => {
    const passwordValue = null;
    userServiceSpy = jasmine.createSpyObj('UserService', ['getPassword']);
    userServiceSpy.getPassword.and.returnValue(Promise.resolve(passwordValue));
    TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no menu', async () => {
    const menuItems = fixture.nativeElement.querySelectorAll('ion-menu');
    expect(menuItems.length).toEqual(0);
  });

  describe('when there is no saved user password', () => {
    it('should have a single button', () => {
      const buttons = fixture.nativeElement.querySelectorAll('ion-button');
      expect(buttons.length).toEqual(1);
    });

    it('should be a setup button', () => {
      const buttons = fixture.nativeElement.querySelectorAll('ion-button');
      expect(buttons.length).toEqual(1);
      expect(buttons[0].textContent).toContain('Setup Wallet');
    });
  });

  describe('when there is a saved user password', () => {
    it('should be a login button', fakeAsync(() => {
      userServiceSpy.getPassword.and.returnValue(Promise.resolve('abc'));
      tick();
      fixture.detectChanges();
      const buttons = fixture.nativeElement.querySelectorAll('ion-button');
      expect(buttons.length).toEqual(
        1,
        'number of buttons on the page should be 1',
      );
      expect(buttons[0].textContent).toContain(
        'Login',
        'The button should be a login button',
      );
    }));
  });
});
