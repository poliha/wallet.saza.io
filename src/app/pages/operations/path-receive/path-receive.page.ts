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
  helpUrl = '';
  public findPathForm: FormGroup;
  public choosePathForm: FormGroup;
  public sendPathForm: FormGroup;
  public pathsFound = [];
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
    this.sendPathForm = new FormGroup({});

    console.log('choosepathForm: ', this.choosePathForm);
  }

  goToNext() {
    this.stepper.next();
  }

  // Getters for template
  get destinationAsset() {
    return this.findPathForm.get('destinationAsset').value;
  }
  get destinationAmount() {
    return this.findPathForm.get('destinationAmount').value;
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

      this.stepper.next();
    } catch (error) {}
  }
}
