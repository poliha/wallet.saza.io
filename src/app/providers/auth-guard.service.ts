import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';


export interface CanDeactivateComponent {
  canDeactivate: (nextUrl: string) => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class AuthGuardService implements CanActivate, CanDeactivate<CanDeactivateComponent> {
  private isLoggedIn: boolean;
  constructor(public userService: UserService, public router: Router) {
    this.userService.isLoggedIn.subscribe((data) => {
      console.log(data);
      this.isLoggedIn = data;
    });
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    console.log("AG, islogged in: ", this.isLoggedIn)
    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }

    const isSetupComplete = this.userService.isSetupComplete();
    if (this.isLoggedIn && !isSetupComplete) {
      if (state.url === '/saza-setup') {
        // return true to avoid redirect loop when url is saza-setup
        return true;
      } else {
        this.router.navigate(['saza-setup']);
        return false;
      }
    }


    if (this.isLoggedIn && isSetupComplete) {
      // if user is already logged in dont navigate to auth links
      const authLinks = [
        'saza-setup',
        'login'
      ];
      if (this.urlHasString(state.url, authLinks)) {
        this.router.navigate(['link-account']);
        return false;
      }
    }

    return true;
  }

  canDeactivate(component: CanDeactivateComponent, currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
    return component.canDeactivate ? component.canDeactivate(nextState.url) : true;
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
    console.log("HS: ", haystack)
    console.log("found: ", found)
    return found;
  }

}
