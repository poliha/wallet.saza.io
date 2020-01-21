import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss'],
})
export class CopyButtonComponent implements OnInit, OnDestroy {

  @Input() copyInput = '';
  @Input() buttonSize = 'default';
  @Output() copyOutput: EventEmitter<any> = new EventEmitter();

  copyText = 'Copy';
  fillType = 'outline';
  copyTimeout;
  constructor(private clipboardService: ClipboardService) { }

  ngOnInit() {}

  copy() {
    this.clipboardService.copyFromContent(this.copyInput);
    this.copyOutput.emit(this.copyInput);
    this.toggleCopyText();
    this.copyTimeout = setTimeout(() => {
     this.toggleCopyText();
    }, 2000);
  }

  toggleCopyText() {
    if (this.copyText === 'Copy') {
      this.copyText = 'Copied!';
      this.fillType = 'solid';
    } else {
      this.copyText = 'Copy';
      this.fillType = 'outline';
    }
  }

  ngOnDestroy() {
    clearTimeout(this.copyTimeout);
  }
}
