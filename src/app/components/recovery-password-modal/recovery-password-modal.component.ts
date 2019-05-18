import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recovery-password-modal',
  templateUrl: './recovery-password-modal.component.html',
  styleUrls: ['./recovery-password-modal.component.scss'],
})
export class RecoveryPasswordModalComponent implements OnInit {
  @Input() recoveryPassword: string;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}


  itemCopied(item) {
    console.log("item: ", item);
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
