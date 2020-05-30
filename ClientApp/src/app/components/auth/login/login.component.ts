import {Component} from '@angular/core';
import {AppState} from '../../../core/store/reducers';
import {Store} from '@ngrx/store';
import {tryLogInUser} from '../../../core/store/auth/auth.actions';
import {FormControl} from '@angular/forms';
import AuthStatus from '../../../core/models/auth-status.enum';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('crossfadeLogin',
      [
        transition(':enter', [
          style({
            opacity: 0,
            transform: 'scale(0)'
          }),
          animate('500ms', style({
            opacity: 1,
            transform: 'scale(1)'
          })),
        ]),
        transition(':leave', [
          animate('500ms', style({
            opacity: 0,
            transform: 'scale(0)'
          }))
        ])
      ])
  ]
})
export class LoginComponent {
  public isLoginProcessing: Observable<boolean> = this.store
    .select(state => state.auth.authStatus)
    .pipe(map(authStatus => authStatus === AuthStatus.PENDING));

  public username = new FormControl('');
  public password = new FormControl('');

  constructor(
    private store: Store<AppState>,
  ) {
  }

  public tryLogin(): void {
    this.store.dispatch(tryLogInUser({username: this.username.value, password: this.password.value}));
  }
}
