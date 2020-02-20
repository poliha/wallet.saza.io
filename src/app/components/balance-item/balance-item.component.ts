import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-balance-item',
  templateUrl: './balance-item.component.html',
  styleUrls: ['./balance-item.component.scss'],
})
export class BalanceItemComponent implements OnInit {
  @Input() balance: {
    balance: string;
    limit: string;
    buying_liabilities: string;
    selling_liabilities: string;
    last_modified_ledger: number;
    is_authorized: boolean;
    asset_type: string;
    asset_code?: string;
    asset_issuer?: string;
  };

  constructor() {}

  ngOnInit() {}
}
