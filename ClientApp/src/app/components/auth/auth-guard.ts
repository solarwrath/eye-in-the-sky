import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/store/reducers';
import LoginStatus from '../../core/models/login-status.enum';
import {setMemorizedLink} from '../../core/store/auth/guard/auth-guard.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private canLogin: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {
    // Injectables do not work with lifecycle hooks like ngOnInit, services require it so going for constructor subscription
    this.store
      .select(state => state.auth.loginStatus)
      .subscribe(updatedAuthStatus => this.canLogin = updatedAuthStatus === LoginStatus.LOGGED_IN);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.canLogin) {
      this.router.navigate([
        '/auth',
        'login'
      ]);
      this.store.dispatch(setMemorizedLink({link: route.url.map(urlSegment => urlSegment.path)}));
    }

    return this.canLogin;
  }
}
