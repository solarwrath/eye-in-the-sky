import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducers';
import AuthStatus from '../models/auth-status.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {
  private isLoggedIn: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {
    // Injectables do not work with lifecycle hooks like ngOnInit, services require it so going for constructor subscription
    this.store
      .select(state => state.auth.authStatus)
      .subscribe(updatedAuthStatus => {
        this.isLoggedIn = updatedAuthStatus === AuthStatus.LOGGED_IN;
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // TODO localStore or session, as app reload on user manually typing address, see:
    // https://stackoverflow.com/questions/23682511/how-to-store-user-session-in-angularjs
    if (this.isLoggedIn) {
      this.router.navigate(['/']);
    }

    return !this.isLoggedIn;
  }
}
