import {createAction, props} from '@ngrx/store';

export const setMemorizedLink = createAction('[Auth] Set Memorized Link', props<{link: string[]}>());
export const resetMemorizedLink = createAction('[Auth Guard] Reset Memorized link');
