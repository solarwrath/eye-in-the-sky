import {Action, createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import AuthStatus from '../models/auth-status.enum';

export interface AuthState {
  authStatus: AuthStatus;
}

const initialState: AuthState = {
  authStatus: AuthStatus.NOT_LOGGED_IN,
};

// tslint:disable-next-line:variable-name
export const _authReducer = createReducer(
  initialState,
  on(AuthActions.tryLogInUser, (state) => {
    return {
      ...state,
      authStatus: AuthStatus.PENDING,
    };
  }),
  on(AuthActions.loginFailed, (state) => {
    return {
      ...state,
      authStatus: AuthStatus.NOT_LOGGED_IN,
    };
  }),
  on(AuthActions.loginSucceeded, (state) => {
    return {
      ...state,
      authStatus: AuthStatus.LOGGED_IN,
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
