import { Component, OnInit } from '@angular/core';
import { TxService, StellarService } from 'src/app/providers/providers';
import { ActivatedRoute, Router } from '@angular/router';
import { SplitOpName } from 'src/app/pipes/split-operation-name';
import { TitleCasePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-operations-queue-detail',
  templateUrl: './operations-queue-detail.page.html',
  styleUrls: ['./operations-queue-detail.page.scss'],
})
export class OperationsQueueDetailPage implements OnInit {
  operationId: any;
  operationDetail: any;
  pageTitle = '';
  subTitle = 'Pending Operation';
  showMenuButton = false;
  showBackButton = true;
  compareFn = (a, b) => 0; // preserves object order

  constructor(private txService: TxService, private stellarService: StellarService,
    private router: Router, private route: ActivatedRoute, private alertCtrl: AlertController,
    private splitOpNamePipe: SplitOpName, private titleCasePipe: TitleCasePipe) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.operationId = this.route.snapshot.paramMap.get('id');
    this.txService.getOperations().then(data => {
      if (!data) { return; }

      const ops = this.stellarService.getOperationObject(data);
      this.operationDetail = ops[this.operationId];
      if (!this.operationDetail) { return; }

      this.operationDetail.type = this.titleCasePipe.transform(this.splitOpNamePipe.transform(this.operationDetail.type));
      this.pageTitle = this.operationDetail.type;
      console.log('od: ', this.operationDetail);
    });
  }

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'This operation will be removed from the queue.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Continue',
          handler: () => {
            this.deleteOperation();
          }
        }
      ],
    });

    await alert.present();
  }

  async deleteOperation() {
    await this.txService.deleteOperation(this.operationId);
    this.router.navigate(['operations-queue/']);
  }
}
