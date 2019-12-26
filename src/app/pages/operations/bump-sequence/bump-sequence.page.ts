import { Component, OnInit } from '@angular/core';
import { TxService, NotificationService } from '../../../providers/providers';
import { Operation } from 'stellar-sdk';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bump-sequence',
  templateUrl: './bump-sequence.page.html',
  styleUrls: ['./bump-sequence.page.scss'],
})
export class BumpSequencePage implements OnInit {
  public bumpSequenceForm: FormGroup;
  constructor(private txService: TxService, private notification: NotificationService) {
  }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.bumpSequenceForm = new FormGroup({});
  }

  // Getters for template
  get source() { return this.bumpSequenceForm.get('source'); }
  get bumpTo() { return this.bumpSequenceForm.get('bumpTo'); }

  private buildOperation() {
    // build bump sequence operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      // to do check if source account is active
      const opsObj = {
        bumpTo: String(this.bumpTo.value),
        source: this.source.value
      };

      console.log('bumpSeqOps: ', opsObj);
      const bumpSeqOperation = Operation.bumpSequence(opsObj);
      const xdrString = bumpSeqOperation.toXDR().toString('base64');
      this.txService.addOperation({ type: 'bump_sequence', tx: xdrString });
      this.notification.show('Operation Added');
      this.bumpSequenceForm.reset({source: this.source.value});
      console.log('bumpSeqOps: ', xdrString);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  addOperation() {
    console.log('adding operation');
    this.buildOperation();
    // to do navigate to next page
  }

  signOperation() {
    console.log('signing operation');
    this.buildOperation();
    // to do navigate to next page
  }
}
