import {Component} from '@angular/core';
import {AppState} from '../../../core/store/reducers';
import {Store} from '@ngrx/store';
import {tryLogInUser} from '../../../core/store/auth/auth.actions';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(
    private store: Store<AppState>,
  ) {
  }

  public tryLogin(): void {
    this.store.dispatch(tryLogInUser({username: this.loginForm.value.username, password: this.loginForm.value.password}));
  }
}
