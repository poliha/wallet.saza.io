
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { InjectorService } from './app/providers/injector.service';

if (environment.production) {
  enableProdMode();
  if (window) {
    window.console.log = function () {};
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((loadedModule) => InjectorService.setInjector(loadedModule.injector))
  .catch((err) => console.log(err));
