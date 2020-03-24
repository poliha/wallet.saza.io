import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFlagComponent } from './account-flag.component';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material.module';

describe('AccountFlagComponent', () => {
  let component: AccountFlagComponent;
  let fixture: ComponentFixture<AccountFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountFlagComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, IonicModule, FormsModule, MaterialModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFlagComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    component.showImmutable = false;
    component.controlName = 'setFlags';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
