import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerTypeComponent } from './signer-type.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

describe('SignerTypeComponent', () => {
  let component: SignerTypeComponent;
  let fixture: ComponentFixture<SignerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignerTypeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, IonicModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignerTypeComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    component.controlName = 'signer';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
