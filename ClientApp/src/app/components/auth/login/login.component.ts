import {Component} from '@angular/core';
import {AppState} from '../../../core/store/reducers';
import {Store} from '@ngrx/store';
import {tryLogInUser} from '../../../core/store/auth/auth.actions';
import {FormControl, RequiredValidator, Validators} from '@angular/forms';
import LoginStatus from '../../../core/models/login-status.enum';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);

  constructor(
    private store: Store<AppState>,
  ) {
  }

  public tryLogin(): void {
    this.store.dispatch(tryLogInUser({username: this.username.value, password: this.password.value}));
  }
}
