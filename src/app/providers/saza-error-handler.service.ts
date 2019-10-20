import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SazaErrorHandler implements ErrorHandler {
  constructor() { }

  handleError(error: any): void {
    console.error('SEH: ', error);
  }
}
