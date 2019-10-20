import { Injectable, ErrorHandler } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SazaErrorHandler implements ErrorHandler {
  constructor(private notification: NotificationService) { }

  handleError(error: any): void {
    console.error('SEH: ', error);
    this.notification.show(error);
  }
}
