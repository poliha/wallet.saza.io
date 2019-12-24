import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recovery-password-modal',
  templateUrl: './recovery-password-modal.component.html',
  styleUrls: ['./recovery-password-modal.component.scss'],
})
export class RecoveryPasswordModalComponent {
  @Input() recoveryPassword: string;
  constructor(private modalController: ModalController, private alertCtrl: AlertController) { }

  itemCopied(item) {
    console.log("item: ", item);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async isPasswordSaved() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'This password can not be reset. Ensure that you have saved it before you continue.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Continue',
          handler: () => {
            this.closeModal();
          }
        }
      ],
    });

    await alert.present();
  }

}
