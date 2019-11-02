import { Injectable, ErrorHandler } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SazaErrorHandler implements ErrorHandler {
  constructor(private notification: NotificationService) { }

  handleError(error: any) {
    console.error('SEH: ', error);
    return this.notification.show(error);
  }
}
