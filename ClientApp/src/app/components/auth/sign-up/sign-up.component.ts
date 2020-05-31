import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/store/reducers';
import {trySignUpUser} from '../../../core/store/auth/auth.actions';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
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
export class SignUpComponent {
  public signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    (group: FormGroup) => {
      const password = group.get('password').value;
      const confirmPassword = group.get('confirmPassword').value;

      return password === confirmPassword ? null : {passWordConfirmationFail: true};
    }
  );

  constructor(
    private store: Store<AppState>,
  ) {
  }

  public trySignUp(): void {
    this.store.dispatch(trySignUpUser({username: this.signUpForm.value.username, password: this.signUpForm.value.password}));
  }
}
