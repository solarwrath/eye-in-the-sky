import {createAction, props} from '@ngrx/store';

export const tryLogInUser = createAction('[Auth] Try Log In User', props<{ username: string, password: string }>());
export const loginFailed = createAction('[Auth] Log In Failed');
export const loginSucceeded = createAction('[Auth] Log In Succeeded');

export const trySignUpUser = createAction('[Auth] Try Sign Up User', props<{ username: string, password: string }>());
export const signUpFailed = createAction('[Auth] Sign Up Failed');
export const signUpSucceeded = createAction('[Auth] Sign Up Succeeded');
export const resetSignUpStatus = createAction('[Auth] Sign Up Reset Status');
