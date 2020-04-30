import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SazaDateTimeComponent } from './saza-date-time.component';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { Utility } from 'src/app/providers/utility';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SazaDateTimeComponent', () => {
  let component: SazaDateTimeComponent;
  let fixture: ComponentFixture<SazaDateTimeComponent>;
  let utilityServiceSpy;

  beforeEach(async(() => {
    utilityServiceSpy = jasmine.createSpyObj('Utility', ['range']);

    TestBed.configureTestingModule({
      declarations: [SazaDateTimeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [{ provide: Utility, useValue: utilityServiceSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SazaDateTimeComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    component.controlName = 'time';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
