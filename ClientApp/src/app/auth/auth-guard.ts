import {Injectable, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducers';
import AuthStatus from '../models/auth-status.enum';

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
      .select(state => state.auth.authStatus)
      .subscribe(updatedAuthStatus => this.canLogin = updatedAuthStatus === AuthStatus.LOGGED_IN);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.canLogin) {
      this.router.navigate(['login']);
    }

    return this.canLogin;
  }
}
