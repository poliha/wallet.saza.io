import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss'],
})
export class CopyButtonComponent implements OnInit {

  @Input() copyInput = '';
  @Output() copyOutput: EventEmitter<any> = new EventEmitter();
  constructor(private clipboardService: ClipboardService) { }

  ngOnInit() {}

  copy() {
    this.clipboardService.copyFromContent(this.copyInput);
    this.copyOutput.emit(this.copyInput);
    console.log("cin: ", this.copyInput)
    console.log("cout: ", this.copyOutput)
  }

}
