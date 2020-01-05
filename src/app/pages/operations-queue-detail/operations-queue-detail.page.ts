import { Component, OnInit } from '@angular/core';
import { TxService, StellarService } from 'src/app/providers/providers';
import { ActivatedRoute } from '@angular/router';
import { SplitOpName } from 'src/app/pipes/split-operation-name';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-operations-queue-detail',
  templateUrl: './operations-queue-detail.page.html',
  styleUrls: ['./operations-queue-detail.page.scss'],
})
export class OperationsQueueDetailPage implements OnInit {
  operationDetail: any;
  pageTitle = '';
  subTitle = 'Pending Operation';
  showMenuButton = false;
  showBackButton = true;
  compareFn = (a, b) => 0; // preserves object order

  constructor(private txService: TxService, private stellarService: StellarService,
    private route: ActivatedRoute, private splitOpNamePipe: SplitOpName, private titleCasePipe: TitleCasePipe) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const operationId = this.route.snapshot.paramMap.get('id');

    this.txService.getOperations().then(data => {
      if (!data) { return; }

      const ops = this.stellarService.getOperationObject(data);
      this.operationDetail = ops[operationId];
      if (!this.operationDetail) { return; }

      this.operationDetail.type = this.titleCasePipe.transform(this.splitOpNamePipe.transform(this.operationDetail.type));
      this.pageTitle = this.operationDetail.type;
      console.log('od: ', this.operationDetail);
    });
  }
}
