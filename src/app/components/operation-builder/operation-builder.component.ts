import { Component, OnInit } from '@angular/core';
import {
  TxService,
  NotificationService,
  StellarService,
  LoadingService,
} from 'src/app/providers/providers';
import { Router } from '@angular/router';
import { InjectorService } from 'src/app/providers/injector.service';
import { SazaError } from 'src/app/providers/errors';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-operation-builder',
  templateUrl: './operation-builder.component.html',
  styleUrls: ['./operation-builder.component.scss'],
})
export class OperationBuilderComponent implements OnInit {
  private _operationType = '';
  private _operationXDR = '';
  protected txService: TxService;
  protected notification: NotificationService;
  protected stellarService: StellarService;
  protected router: Router;
  protected loadingService: LoadingService;
  operationForm: FormGroup;
  operationData: any;
  pageTitle = '';
  subTitle = 'Operation';
  helpUrl = '#';
  constructor() {
    const injector = InjectorService.getInjector();
    this.txService = injector.get(TxService);
    this.stellarService = injector.get(StellarService);
    this.notification = injector.get(NotificationService);
    this.router = injector.get(Router);
    this.loadingService = injector.get(LoadingService);
  }

  ngOnInit() {}

  public get operationType(): string {
    return this._operationType;
  }

  public set operationType(v: string) {
    this._operationType = v;
  }

  public get operationXDR(): string {
    return this._operationXDR;
  }

  public set operationXDR(v: string) {
    this._operationXDR = v;
  }

  async buildOperation() {
    try {
      await this.loadingService.start();
      if (!this._operationType) {
        throw new SazaError('Invalid operation type.');
      }
      this.operationXDR = await this.stellarService.buildOperation(
        this.operationData,
      );
      await this.addOperation();
    } catch (error) {
      throw error;
    } finally {
      await this.loadingService.stop();
    }
  }

  addOperation() {
    if (!this._operationType) {
      throw new SazaError('Invalid operation type.');
    }

    if (!this._operationXDR) {
      throw new SazaError('Unable to build operation.');
    }

    return this.txService
      .addOperation({
        type: this.operationType,
        tx: this.operationXDR,
      })
      .then(() => {
        this.notification.success('Operation Added');
      });
  }

  buildTransaction() {
    this.buildOperation().then(() => {
      this.router.navigate(['build-tx/']);
    });
  }
}
