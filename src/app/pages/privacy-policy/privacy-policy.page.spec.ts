import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrivacyPolicyPage } from './privacy-policy.page';
import { UserService } from 'src/app/providers/providers';
import { RouterTestingModule } from '@angular/router/testing';

describe('PrivacyPolicyPage', () => {
  let component: PrivacyPolicyPage;
  let fixture: ComponentFixture<PrivacyPolicyPage>;
  let userServiceSpy;

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['isAuthValid']);
    userServiceSpy.isAuthValid.and.returnValue(Promise.resolve(true));
    TestBed.configureTestingModule({
      declarations: [PrivacyPolicyPage],
      imports: [RouterTestingModule, IonicModule],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
