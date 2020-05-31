import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/store/reducers';
import LoginStatus from '../../core/models/login-status.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginAndSignUpRedirectGuard implements CanActivate {
  private isLoggedIn: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {
    // Injectables do not work with lifecycle hooks like ngOnInit, services require it so going for constructor subscription
    this.store
      .select(state => state.auth.loginStatus)
      .subscribe(updatedAuthStatus => {
        this.isLoggedIn = updatedAuthStatus === LoginStatus.LOGGED_IN;
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // TODO Will replace it to use cookies etc. late
    if (sessionStorage.getItem('loggedIn') === 'true') {
      this.router.navigate(['']);
      return false;
    }

    return !this.isLoggedIn;
  }
}
