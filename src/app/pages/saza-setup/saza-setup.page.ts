import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-saza-setup',
  templateUrl: './saza-setup.page.html',
  styleUrls: ['./saza-setup.page.scss'],
})
export class SazaSetupPage implements OnInit {
  suggestedPassword = '';
  constructor() { }

  ngOnInit() { }

  itemCopied(item) {
    console.log("item: ", item);
  }

  getPassword(password){
    this.suggestedPassword = password;
  }

}
