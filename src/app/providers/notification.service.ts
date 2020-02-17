import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  defaultDuration = 3000;
  defaultColour = 'primary';
  constructor(private toastCtrl: ToastController) {}

  async show(options: {
    message: string;
    duration?: number;
    color?: string;
    dismissButton?: Boolean;
  }) {
    const { message, duration, color, dismissButton } = options;

    if (!message) {
      return;
    }
    const toastOptions: any = {
      message,
      color: color || this.defaultColour,
    };

    if (dismissButton) {
      toastOptions.buttons = [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ];
    } else {
      toastOptions.duration = duration || this.defaultDuration;
    }

    const toast = await this.toastCtrl.create(toastOptions);
    toast.present();
  }

  success(message: string) {
    return this.show({ message, color: 'success' });
  }

  info(message: string) {
    return this.show({ message });
  }

  error(message: string) {
    return this.show({ message, color: 'danger', dismissButton: true });
  }
}
