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

export interface CanDeactivateComponent {
  canDeactivate: (
    nextUrl: string,
  ) => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class AuthGuardService
  implements CanActivate, CanDeactivate<CanDeactivateComponent> {
  private isLoggedIn: boolean;
  constructor(public userService: UserService, public router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    const authLinks = ['saza-setup', 'login', 'forgot-password'];

    const isAuthLink = this.urlHasString(state.url, authLinks);
    this.isLoggedIn = await this.userService.getLoginStatus();
    console.log('AG, islogged in: ', this.isLoggedIn);
    if (isAuthLink && this.isLoggedIn) {
      this.router.navigate(['dashboard']);
      return false;
    }

    if (isAuthLink && !this.isLoggedIn) {
      return true;
    }

    if (!this.isLoggedIn) {
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

  // check if URL contains string
  urlHasString(haystack: string, links: Array<string>) {
    let found = false;
    for (let i = 0; i < links.length; i++) {
      if (haystack.includes(links[i])) {
        found = true;
        break;
      }
    }
    console.log('HS: ', haystack);
    console.log('found: ', found);
    return found;
  }
}
