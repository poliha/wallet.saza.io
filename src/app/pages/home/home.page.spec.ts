import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomePage } from './home.page';
import { UserService } from 'src/app/providers/providers';

fdescribe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let userServiceSpy, getPasswordSpy;

  beforeEach(async(() => {
    let passwordValue = null;
    userServiceSpy = jasmine.createSpyObj('UserService', ['getPassword']);
    getPasswordSpy = userServiceSpy.getPassword.and.returnValue(Promise.resolve(passwordValue));
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
      ],
      imports: [RouterTestingModule.withRoutes([])],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when there is no saved user password', () =>{
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
    beforeEach(fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
    }));

    it('should be a login button', fakeAsync(() => {
      userServiceSpy.getPassword.and.returnValue(Promise.resolve("abc"));
      component.ngOnInit()
      fixture.detectChanges();
      tick();
      const buttons = fixture.nativeElement.querySelectorAll('ion-button');
      expect(buttons.length).toEqual(1, 'number of buttons on the page should be 1');
      expect(buttons[0].textContent).toContain('Login', 'The button should be a login button');
    }));
  });
  
});
