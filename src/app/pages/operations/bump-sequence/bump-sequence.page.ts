import { Component, OnInit } from '@angular/core';
import { TxService, NotificationService, StellarService } from '../../../providers/providers';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bump-sequence',
  templateUrl: './bump-sequence.page.html',
  styleUrls: ['./bump-sequence.page.scss'],
})
export class BumpSequencePage implements OnInit {
  public bumpSequenceForm: FormGroup;
  pageTitle = 'Bump Sequence';
  helpUrl = '';
  constructor(private txService: TxService, private notification: NotificationService,
    private stellarService: StellarService) {
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

  private async buildOperation() {
    // build bump sequence operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      const opData = {
        bumpTo: String(this.bumpTo.value),
        source: this.source.value,
        opType: this.stellarService.operationType.BUMP_SEQUENCE
      };

      console.log('bumpSeqOps: ', opData);
      const xdrString = await this.stellarService.buildOperation(opData)
      this.txService.addOperation({ type: opData.opType, tx: xdrString });
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
