import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as niceware from 'niceware';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.scss'],
})
export class GeneratePasswordComponent implements OnInit {

  suggestion = '';
  @Output() password: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.suggestPassword();
  }

  suggestPassword() {
    const temp = niceware.generatePassphrase(10);
    const tempCaps = temp.map(p => p.charAt().toUpperCase() + p.slice(1));
    this.suggestion = tempCaps.join(' ');
    console.log('pg: ', this.suggestion);
    this.password.emit(this.suggestion);
  }

}
