import { Injectable, ErrorHandler } from '@angular/core';
import { NotificationService } from './notification.service';
import { BadRequestError, NotFoundError } from 'stellar-sdk';
import { SazaError } from './errors';

@Injectable({
  providedIn: 'root',
})
export class SazaErrorHandler implements ErrorHandler {
  errorMessages = [];
  constructor(private notification: NotificationService) {}

  handleError(error: any) {
    if (error.rejection) {
      console.log('assign error = error.rejection.');
      error = error.rejection;
    }

    if (error instanceof SazaError) {
      this.errorMessages.push(error.message);
    } else if (error instanceof NotFoundError) {
      this.errorMessages.push(
        'The account is not active. You can activate it by sending the minimum amount to the account.',
      );
    } else if (error instanceof BadRequestError) {
      this.errorMessages.push(
        'Request could not be completed. Please try again',
      );
    } else {
      this.errorMessages.push('Unable to process request.');
    }

    this.notification.show(this.errorMessages.join('\n'));
    this.errorMessages = [];
    console.log('error stack: ', error.stack);
    return;
  }
}
