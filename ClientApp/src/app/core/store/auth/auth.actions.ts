import {createAction, props} from '@ngrx/store';

export const tryLogInUser = createAction('[Auth] Try Log In User', props<{ username: string, password: string }>());
export const loginFailed = createAction('[Auth] Log In Failed');
export const loginSucceeded = createAction('[Auth] Log In Succeeded');
