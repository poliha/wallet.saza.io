import { Injector } from '@angular/core';

// A manual injector service
export class InjectorService {
  private static injector: Injector;

  static setInjector(injector: Injector) {
    InjectorService.injector = injector;
  }

  static getInjector(): Injector {
    return InjectorService.injector;
  }
}
