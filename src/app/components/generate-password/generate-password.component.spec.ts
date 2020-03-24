import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePasswordComponent } from './generate-password.component';
import { Utility } from 'src/app/providers/utility';

describe('GeneratePasswordComponent', () => {
  let component: GeneratePasswordComponent;
  let fixture: ComponentFixture<GeneratePasswordComponent>;
  let utilitySpy;

  beforeEach(async(() => {
    utilitySpy = jasmine.createSpyObj('Utility', ['generatePassword']);

    TestBed.configureTestingModule({
      declarations: [GeneratePasswordComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Utility, useValue: utilitySpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
