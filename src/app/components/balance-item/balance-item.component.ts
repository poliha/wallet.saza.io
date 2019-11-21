import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-balance-item',
  templateUrl: './balance-item.component.html',
  styleUrls: ['./balance-item.component.scss'],
})
export class BalanceItemComponent implements OnInit {

  @Input() balance: object = {};

  constructor() { }

  ngOnInit() {}

}
