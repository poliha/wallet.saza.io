import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSourceComponent } from './select-source.component';
import { UserService } from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { TruncatePublicKeyPipeModule } from 'src/app/pipes/truncate-public-key.module';

describe('SelectSourceComponent', () => {
  let component: SelectSourceComponent;
  let fixture: ComponentFixture<SelectSourceComponent>;
  let userServiceSpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };
    userServiceSpy = jasmine.createSpyObj('UserService', ['userAccounts']);
    userServiceSpy.userAccounts = jasmine.createSpyObj('userAccounts', subFn);

    TestBed.configureTestingModule({
      declarations: [SelectSourceComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
      imports: [TruncatePublicKeyPipeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
