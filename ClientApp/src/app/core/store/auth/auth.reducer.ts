import {Action, createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import LoginStatus from '../../models/login-status.enum';
import SignUpStatus from '../../models/sign-up-status.enum';

export interface AuthState {
  loginStatus: LoginStatus;
  signUpStatus: SignUpStatus;
}

const initialState: AuthState = {
  loginStatus: LoginStatus.NOT_LOGGED_IN,
  signUpStatus: SignUpStatus.NO_STATUS,
};

// tslint:disable-next-line:variable-name
export const _authReducer = createReducer(
  initialState,
  on(AuthActions.tryLogInUser, (state) => {
    return {
      ...state,
      loginStatus: LoginStatus.PENDING,
    };
  }),
  on(AuthActions.loginFailed, (state) => {
    return {
      ...state,
      loginStatus: LoginStatus.NOT_LOGGED_IN,
    };
  }),
  on(AuthActions.loginSucceeded, (state) => {
    return {
      ...state,
      loginStatus: LoginStatus.LOGGED_IN,
    };
  }),
  on(AuthActions.trySignUpUser, (state) => {
    return {
      ...state,
      signUpStatus: SignUpStatus.PENDING,
    };
  }),
  on(AuthActions.signUpFailed, (state) => {
    return {
      ...state,
      signUpStatus: SignUpStatus.SIGN_UP_FAILED,
    };
  }),
  on(AuthActions.signUpSucceeded, (state) => {
    return {
      ...state,
      signUpStatus: SignUpStatus.SIGN_UP_SUCCESSFUL,
    };
  }),
  on(AuthActions.resetSignUpStatus, (state) => {
    return {
      ...state,
      signUpStatus: SignUpStatus.NO_STATUS,
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
