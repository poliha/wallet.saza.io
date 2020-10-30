import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Utility } from 'src/app/providers/utility';
import { OperationBuilderComponent } from 'src/app/components/operation-builder/operation-builder.component';

@Component({
  selector: 'app-path-send',
  templateUrl: './path-send.page.html',
  styleUrls: ['./path-send.page.scss'],
})
export class PathSendPage extends OperationBuilderComponent implements OnInit {
  public findPathForm: FormGroup;
  public choosePathForm: FormGroup;
  public operationForm: FormGroup;
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
  @ViewChild('stepper') stepper: MatStepper;

  constructor(private utility: Utility) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.pageTitle = 'Path Payment Strict Send';
    this.helpUrl = 'https://docs.saza.io/stellar-operations/path-payment-send';
    this.operationType = this.stellarService.operationType.PATH_PAYMENT_STRICT_SEND;
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
  get sourceAsset() {
    return this.findPathForm.get('sourceAsset').value;
  }
  get sourceAmount() {
    return this.findPathForm.get('sourceAmount').value;
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
        destination,
        sourceAsset,
        sourceAmount,
      } = this.findPathForm.value;
      const paths = await this.stellarService.findPathSend({
        destination,
        sourceAmount,
        sourceAsset: this.utility.generateAsset(sourceAsset),
      });

      this.pathsFound = paths;

      this.sendParams.destination = destination;

      this.nextStep();
    } catch (error) {
      throw error;
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
    this.sendParams.path = path.path.map((asset) =>
      this.utility.generateAsset(asset),
    );

    this.nextStep();
  }

  setOperationData() {
    const { source } = this.operationForm.value;
    this.sendParams.source = source;
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
