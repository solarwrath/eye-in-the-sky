import {Component} from '@angular/core';
import {AppState} from '../../../core/store/reducers';
import {Store} from '@ngrx/store';
import {tryLogInUser} from '../../../core/store/auth/auth.actions';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import LoginStatus from '../../../core/models/login-status.enum';
import SignUpStatus from '../../../core/models/sign-up-status.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public loginSuccessful: Observable<boolean | null> =
    this.store.select(state => state.auth.loginStatus)
      .pipe(map(loginStatus => {
        switch (loginStatus) {
          case LoginStatus.LOGGED_IN:
            return true;
          case LoginStatus.LOGIN_FAILED:
            return false;
          case LoginStatus.PENDING:
          case LoginStatus.NO_STATUS:
            return null;
        }
      }));

  public signUpSuccessful: Observable<boolean | null> =
    this.store.select(state => state.auth.signUpStatus)
      .pipe(map(signUpStatus => {
        switch (signUpStatus) {
          case SignUpStatus.SIGN_UP_SUCCESSFUL:
            return true;
          case SignUpStatus.SIGN_UP_FAILED:
            return false;
          case SignUpStatus.PENDING:
          case SignUpStatus.NO_STATUS:
            return null;
        }
      }));

  constructor(
    private store: Store<AppState>,
  ) {
  }

  public tryLogin(): void {
    this.store.dispatch(tryLogInUser({username: this.loginForm.value.username, password: this.loginForm.value.password}));
  }
}
