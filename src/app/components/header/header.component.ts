import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/providers/providers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() helpUrl: string;
  @Input() subTitle: string;
  @Input() accountPicker = false;

  isTestNetwork: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.activeNetwork.subscribe(data => {
      this.isTestNetwork = data.type === 'testnet' ? true : false;
    });
  }

}
