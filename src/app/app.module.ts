import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  Utility,
  UserService,
  AuthGuard,
  NotificationService,
  LoadingService,
} from './providers/providers';
import { IonicStorageModule } from '@ionic/storage';
import { SazaErrorHandler } from './providers/saza-error-handler.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage'],
      name: environment.DB_NAME,
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Utility,
    UserService,
    AuthGuard,
    NotificationService,
    LoadingService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: SazaErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
