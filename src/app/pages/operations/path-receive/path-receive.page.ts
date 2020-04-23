import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Utility } from 'src/app/providers/providers';
import { MatStepper } from '@angular/material';
import { OperationBuilderComponent } from 'src/app/components/operation-builder/operation-builder.component';

@Component({
  selector: 'app-path-receive',
  templateUrl: './path-receive.page.html',
  styleUrls: ['./path-receive.page.scss'],
})
export class PathReceivePage extends OperationBuilderComponent
  implements OnInit {
  public findPathForm: FormGroup;
  public choosePathForm: FormGroup;
  public operationForm: FormGroup;
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

  constructor(private utility: Utility) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.pageTitle = 'Path Payment Strict Receive';
    this.helpUrl =
      'https://docs.saza.io/stellar-operations/path-payment-receive';
    this.operationType = this.stellarService.operationType.PATH_PAYMENT_STRICT_RECEIVE;
    this.makeForm();
  }

  makeForm() {
    this.findPathForm = new FormGroup({});
    this.choosePathForm = new FormGroup({
      selectedPath: new FormControl('', Validators.required),
    });
    this.operationForm = new FormGroup({});
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

  previousStep() {
    this.stepper.previous();
  }

  nextStep() {
    this.stepper.next();
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

      this.pathsFound = paths;

      this.sendParams.source = source;

      this.nextStep();
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
    this.sendParams.path = path.path.map((asset) =>
      this.utility.generateAsset(asset),
    );

    this.nextStep();
  }

  setOperationData() {
    const { destination } = this.operationForm.value;
    this.sendParams.destination = destination;
    this.sendParams.opType = this.operationType;

    this.operationData = {
      ...this.sendParams,
    };
  }

  async saveOperation() {
    this.setOperationData();
    await this.buildOperation();
    this.stepper.reset();
  }

  async sendOperation() {
    this.setOperationData();
    await this.buildTransaction();
  }
}
