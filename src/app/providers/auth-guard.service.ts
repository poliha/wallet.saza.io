import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';

export interface CanDeactivateComponent {
  canDeactivate: (
    nextUrl: string,
  ) => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class AuthGuardService
  implements CanActivate, CanDeactivate<CanDeactivateComponent> {
  private isLoggedIn: boolean;
  private authLinks = ['saza-setup', 'login', 'forgot-password'];

  constructor(
    public userService: UserService,
    public router: Router,
    private notification: NotificationService,
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    const isAuthLink = this.isAuthUrl(state.url);

    this.isLoggedIn = await this.userService.isAuthValid();
    if (isAuthLink) {
      if (!this.isLoggedIn) {
        return true;
      }
      this.router.navigate(['dashboard']);
      return false;
    }

    if (!this.isLoggedIn) {
      this.userService.logout();
      this.notification.info('Session expired, please login.');
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

  canDeactivate(
    component: CanDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot,
  ) {
    return component.canDeactivate
      ? component.canDeactivate(nextState.url)
      : true;
  }

  // checks if url is an auth url
  isAuthUrl(nextUrl: string) {
    return this.authLinks.some((link) => nextUrl.includes(link));
  }
}
