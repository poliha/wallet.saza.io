import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import {
  TxService,
  NotificationService,
  StellarService,
} from 'src/app/providers/providers';
import { Utility } from 'src/app/providers/utility';

@Component({
  selector: 'app-path-send',
  templateUrl: './path-send.page.html',
  styleUrls: ['./path-send.page.scss'],
})
export class PathSendPage implements OnInit {
  pageTitle = 'Path Payment Strict Send';
  helpUrl = '';
  public findPathForm: FormGroup;
  public choosePathForm: FormGroup;
  public sendPaymentForm: FormGroup;
  public pathsFound = [];
  public sendParams = {
    sendAsset: undefined,
    sendAmount: '',
    destination: '',
    destAsset: undefined,
    destMin: '',
    path: [],
    source: '',
    opType: '',
  };
  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  constructor(
    private txService: TxService,
    private notification: NotificationService,
    private stellarService: StellarService,
    private utility: Utility,
  ) {}

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.findPathForm = new FormGroup({});
    this.choosePathForm = new FormGroup({
      selectedPath: new FormControl('', Validators.required),
    });
    this.sendPaymentForm = new FormGroup({});

    console.log('choosepathForm: ', this.choosePathForm);

    console.log('sendForm: ', this.sendPaymentForm);
  }

  // Getters for template
  get sourceAsset() {
    return this.findPathForm.get('sourceAsset').value;
  }
  get sourceAmount() {
    return this.findPathForm.get('sourceAmount').value;
  }

  get selectedPath() {
    return this.choosePathForm.get('selectedPath');
  }

  async submitFindPathForm() {
    // get form data
    // validate form data
    // create dest asset
    // find paths
    // use returned paths to populate next form

    try {
      const {
        destination,
        sourceAsset,
        sourceAmount,
      } = this.findPathForm.value;
      const paths = await this.stellarService.findPathSend({
        destination,
        sourceAmount,
        sourceAsset: this.utility.generateAsset(sourceAsset),
      });

      console.log('paths found: ', paths);
      this.pathsFound = paths;

      this.sendParams.destination = destination;

      this.stepper.next();
    } catch (error) {
      console.log(error);
    }
  }

  submitChoosePathForm() {
    if (
      this.selectedPath.value === null ||
      this.selectedPath.value === undefined
    ) {
      return;
    }
    const pathIndex = this.selectedPath.value;
    const path = this.pathsFound[pathIndex];

    this.sendParams.sendAmount = path.source_amount;
    this.sendParams.destMin = path.destination_amount;
    this.sendParams.sendAsset = this.utility.generateAsset({
      asset_type: path.source_asset_type,
      asset_code: path.source_asset_code,
      asset_issuer: path.source_asset_issuer,
    });
    this.sendParams.destAsset = this.utility.generateAsset({
      asset_type: path.destination_asset_type,
      asset_code: path.destination_asset_code,
      asset_issuer: path.destination_asset_issuer,
    });
    this.sendParams.path = path.path.map(asset =>
      this.utility.generateAsset(asset),
    );

    this.stepper.next();
  }

  async submitSendPaymentForm() {
    try {
      const { source } = this.sendPaymentForm.value;
      this.sendParams.source = source;
      this.sendParams.opType = this.stellarService.operationType.PATH_PAYMENT_STRICT_SEND;
      console.log('sendParams: ', this.sendParams);

      const xdrString = await this.stellarService.buildOperation(
        this.sendParams,
      );
      this.txService.addOperation({
        type: this.sendParams.opType,
        tx: xdrString,
      });
      this.notification.show('Operation Added');
      this.stepper.reset();
      console.log('paths send: ', xdrString);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  addOperation() {
    console.log('adding operation');
    this.submitSendPaymentForm();
    // to do navigate to next page
  }

  signOperation() {
    console.log('signing operation');
    this.submitSendPaymentForm();
    // to do navigate to next page
  }
}
