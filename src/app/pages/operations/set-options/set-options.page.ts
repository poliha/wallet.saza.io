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

  private async buildOperation() {
    // build set options operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message
    try {
      const opData = {
        ...this.setOptionsForm.value,
        opType: this.stellarService.operationType.SET_OPTIONS,
      };

      console.log('setoptions Ops: ', opData);
      const xdrString = await this.stellarService.buildOperation(opData);
      this.txService.addOperation({ type: opData.opType, tx: xdrString });
      this.notification.success('Operation Added');
      console.log('account Merge Ops: ', xdrString);
      this.setOptionsForm.reset({ source: this.source.value });
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  addOperation() {
    console.log('adding operation');
    this.buildOperation();
    // to do navigate to next page
  }

  buildTransaction() {
    try {
      this.buildOperation();
      this.router.navigate(['build-tx/']);
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }
}
