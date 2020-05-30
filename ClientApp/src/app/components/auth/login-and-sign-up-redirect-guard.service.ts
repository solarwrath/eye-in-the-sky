import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/store/reducers';
import AuthStatus from '../../core/models/auth-status.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginAndSignUpRedirectGuard implements CanActivate {
  private isLoggedIn: boolean;

  constructor(
    private store: Store<AppState>,
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
    return !this.isLoggedIn;
  }
}
