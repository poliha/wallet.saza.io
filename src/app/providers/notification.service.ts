import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastCtrl: ToastController) { }

  // to do add methods with more options
  async show(message: string) {
    if (message === '') {
      return;
    }

    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
