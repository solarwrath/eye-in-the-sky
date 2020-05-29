import {Action, createReducer, on} from '@ngrx/store';
import * as AuthGuardActions from './auth-guard.actions';

export interface AuthGuardState {
  memorizedLink: string[] | null;
}

const initialState: AuthGuardState = {
  memorizedLink: null,
};

// tslint:disable-next-line:variable-name
export const _authGuardReducer = createReducer(
  initialState,
  on(AuthGuardActions.setMemorizedLink, (state, {link}) => {
    return {
      ...state,
      memorizedLink: link,
    };
  }),
  on(AuthGuardActions.resetMemorizedLink, (state) => {
    return {
      ...state,
      memorizedLink: null,
    };
  }),
);

export function authGuardReducer(state: AuthGuardState | undefined, action: Action) {
  return _authGuardReducer(state, action);
}
