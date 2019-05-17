import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Utility } from '../../providers/providers';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.scss'],
})
export class GeneratePasswordComponent implements OnInit {

  suggestion = '';
  @Output() password: EventEmitter<any> = new EventEmitter();
  constructor(private utility: Utility) { }


  ngOnInit() {
    this.suggestPassword();
  }

  suggestPassword() {
    this.suggestion = this.utility.generatePassword();
    console.log('pg: ', this.suggestion);
    this.password.emit(this.suggestion);
  }

}
