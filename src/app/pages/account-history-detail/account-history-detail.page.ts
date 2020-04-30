import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/providers';
import { SplitOpName } from 'src/app/pipes/split-operation-name';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-account-history-detail',
  templateUrl: './account-history-detail.page.html',
  styleUrls: ['./account-history-detail.page.scss'],
})
export class AccountHistoryDetailPage implements OnInit {
  operationDetail: any;
  operationLinks: any;
  txData: any;
  pageTitle = '';
  subTitle = 'Account History';
  compareFn = (a, b) => 0; // preserves object order

  constructor(
    private userService: UserService,
    private splitOpNamePipe: SplitOpName,
    private titleCasePipe: TitleCasePipe,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.userService.getAccountHistory().then((data) => {
      if (!data) {
        return;
      }
      this.formatData(JSON.parse(data));
    });
  }

  formatData(data) {
    const fieldsToRemove = ['type_i', 'price_r', 'paging_token'];
    this.pageTitle = this.titleCasePipe.transform(
      this.splitOpNamePipe.transform(data.type),
    );
    const { _links: links, transaction_attr: txData, ...output } = data;
    // to do: display these?
    this.operationLinks = links;
    this.txData = txData;

    this.operationDetail = {
      ...Object.keys(output).reduce((acc, curr) => {
        if (!fieldsToRemove.includes(curr)) {
          return {
            ...acc,
            [curr]: output[curr],
          };
        }
        return acc;
      }, {}),
    };
  }
}
