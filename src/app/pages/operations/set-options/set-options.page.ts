import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  TxService,
  NotificationService,
  StellarService,
} from 'src/app/providers/providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-options',
  templateUrl: './set-options.page.html',
  styleUrls: ['./set-options.page.scss'],
})
export class SetOptionsPage implements OnInit {
  public setOptionsForm: FormGroup;
  pageTitle = 'Set Options';
  helpUrl = '';
  constructor(
    private txService: TxService,
    private notification: NotificationService,
    private stellarService: StellarService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.setOptionsForm = new FormGroup({});
    console.log('form: ', this.setOptionsForm);
  }

  // Getters for template
  get source() {
    return this.setOptionsForm.get('source');
  }
  get destination() {
    return this.setOptionsForm.get('destination');
  }
}
