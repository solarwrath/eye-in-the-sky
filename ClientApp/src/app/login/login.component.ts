import {Component} from '@angular/core';
import {AppState} from '../store/reducers';
import {Store} from '@ngrx/store';
import {tryLogInUser} from '../store/auth.actions';
import {NgForm} from '@angular/forms';
import AuthStatus from '../models/auth-status.enum';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public isPending: Observable<boolean> = this.store
    .select(state => state.auth.authStatus)
    .pipe(map(authStatus => authStatus === AuthStatus.PENDING));

  constructor(
    private store: Store<AppState>,
  ) {
  }

  public tryLogin(form: NgForm): void {
    // TODO Consider moving to another approach to enable typing
    this.store.dispatch(tryLogInUser({username: form.value.username, password: form.value.password}));
  }
}
