import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryPasswordModalComponent } from './recovery-password-modal.component';
import { ModalController } from '@ionic/angular';

describe('RecoveryPasswordModalComponent', () => {
  let component: RecoveryPasswordModalComponent;
  let fixture: ComponentFixture<RecoveryPasswordModalComponent>;
  let modalCtrlSpy;

  beforeEach(async(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

    TestBed.configureTestingModule({
      declarations: [RecoveryPasswordModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ModalController, useValue: modalCtrlSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
