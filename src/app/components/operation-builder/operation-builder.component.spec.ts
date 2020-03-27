import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationBuilderComponent } from './operation-builder.component';
import { InjectorService } from 'src/app/providers/injector.service';
import {
  UserService,
  TxService,
  StellarService,
} from 'src/app/providers/providers';
import { RouterTestingModule } from '@angular/router/testing';

describe('OperationBuilderComponent', () => {
  let component: OperationBuilderComponent;
  let fixture: ComponentFixture<OperationBuilderComponent>;
  let userServiceSpy, stellarServiceSpy, txServiceSpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };
    userServiceSpy = jasmine.createSpyObj('UserService', ['activeAccount']);
    stellarServiceSpy = jasmine.createSpyObj('StellarService', {
      fees: Promise.resolve(),
    });
    txServiceSpy = jasmine.createSpyObj('TxService', ['operations', 'getMemo']);

    userServiceSpy.activeAccount = jasmine.createSpyObj('activeAccount', subFn);
    txServiceSpy.operations = jasmine.createSpyObj('operations', subFn);
    txServiceSpy.getMemo.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      declarations: [OperationBuilderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: TxService, useValue: txServiceSpy },
        { provide: StellarService, useValue: stellarServiceSpy },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => InjectorService.setInjector(TestBed.get(Injector)));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
