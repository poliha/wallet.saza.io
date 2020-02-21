import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  TxService,
  NotificationService,
  StellarService,
  Utility,
} from 'src/app/providers/providers';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-path-receive',
  templateUrl: './path-receive.page.html',
  styleUrls: ['./path-receive.page.scss'],
})
export class PathReceivePage implements OnInit {
  pageTitle = 'Path Payment Strict Receive';
  subTitle = 'Operation';
  helpUrl = '';
  public findPathForm: FormGroup;
  public choosePathForm: FormGroup;
  public sendPaymentForm: FormGroup;
  public pathsFound = [];
  public sendParams = {
    sendAsset: undefined,
    sendMax: '',
    destination: '',
    destAsset: undefined,
    destAmount: '',
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
  get destinationAsset() {
    return this.findPathForm.get('destinationAsset').value;
  }
  get destinationAmount() {
    return this.findPathForm.get('destinationAmount').value;
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
        source,
        destinationAsset,
        destinationAmount,
      } = this.findPathForm.value;
      const paths = await this.stellarService.findPathReceive({
        source,
        destinationAmount,
        destinationAsset: this.utility.generateAsset(destinationAsset),
      });

      console.log('paths found: ', paths);
      this.pathsFound = paths;

      this.sendParams.source = source;

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

    this.sendParams.sendMax = path.source_amount;
    this.sendParams.destAmount = path.destination_amount;
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
      const { destination } = this.sendPaymentForm.value;
      this.sendParams.destination = destination;
      this.sendParams.opType = this.stellarService.operationType.PATH_PAYMENT_STRICT_RECEIVE;
      console.log('sendParams: ', this.sendParams);

      const xdrString = await this.stellarService.buildOperation(
        this.sendParams,
      );
      this.txService.addOperation({
        type: this.sendParams.opType,
        tx: xdrString,
      });
      this.notification.success('Operation Added');
      this.stepper.reset();
      console.log('paths receive: ', xdrString);
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
