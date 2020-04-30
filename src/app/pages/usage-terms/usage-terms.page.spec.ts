import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsageTermsPage } from './usage-terms.page';
import { UserService } from 'src/app/providers/providers';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsageTermsPage', () => {
  let component: UsageTermsPage;
  let fixture: ComponentFixture<UsageTermsPage>;
  let userServiceSpy;

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['isAuthValid']);
    userServiceSpy.isAuthValid.and.returnValue(Promise.resolve(true));
    TestBed.configureTestingModule({
      declarations: [UsageTermsPage],
      imports: [RouterTestingModule, IonicModule],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(UsageTermsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
