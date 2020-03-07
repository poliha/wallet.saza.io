import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private loadingCtrl: LoadingController) {}
  defaultMessage = 'Please wait ...';
  timeOut = 10000;
  loader: any;

  async show(message) {
    const options: any = {
      spinner: 'bubbles',
      message: message || this.defaultMessage,
      translucent: true,
      duration: this.timeOut,
    };

    this.loader = await this.loadingCtrl.create(options);
    await this.loader.present();
  }

  start(message = '') {
    return this.show(message);
  }

  async stop() {
    if (!this.loader) {
      return;
    }
    return this.loader.dismiss();
  }
}
