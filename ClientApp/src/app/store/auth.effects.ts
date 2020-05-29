import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppState} from './reducers';
import {Store} from '@ngrx/store';
import {SignalRClientService} from '../signalr/signalr-client.service';
import {loginFailed, loginSucceeded} from './auth.actions';
import {resetMemorizedLink} from './auth-guard.actions';

@Injectable()
export class AuthEffects {
  private memorizedLink: string[] | null = null;

  constructor(
    private actions: Actions,
    private signalrClient: SignalRClientService,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.store
      .select(state => state.authGuard.memorizedLink)
      .subscribe(updatedMemorizedLink => this.memorizedLink = updatedMemorizedLink);
  }

  @Effect({dispatch: false})
  handleLogin = this.actions.pipe(
    ofType(AuthActions.tryLogInUser),
    tap((action) => {
      const subscription = this.signalrClient.checkIdentity(action.username, action.password)
        .subscribe((loginSuccessful: boolean) => {
            if (loginSuccessful) {
              this.store.dispatch(loginSucceeded());
              if (this.memorizedLink !== null) {
                this.router.navigate(this.memorizedLink);
                this.store.dispatch(resetMemorizedLink());
              } else {
                this.router.navigate(['']);
              }
            } else {
              this.store.dispatch(loginFailed());
              this.router.navigate(['login']);
            }
          }
        );
    })
  );
}
