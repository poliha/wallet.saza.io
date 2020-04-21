import { Component, OnInit } from '@angular/core';
import { TxService, StellarService } from 'src/app/providers/providers';

@Component({
  selector: 'app-operations-queue',
  templateUrl: './operations-queue.page.html',
  styleUrls: ['./operations-queue.page.scss'],
})
export class OperationsQueuePage implements OnInit {
  operations = [];
  pageTitle = 'Pending Operations';
  helpUrl = 'https://docs.saza.io/wallet-actions/operations-queue';
  constructor(
    private txService: TxService,
    private stellarService: StellarService,
  ) {}

  ngOnInit() {
    this.txService.operations.subscribe((data) => {
      console.log('pending ops: ', data);
      this.operations = this.stellarService.getOperationObject(data);
      this.pageTitle = `Pending Operations (${this.operations.length})`;
      console.log('pending ops: ', this.operations);
    });
  }
}
