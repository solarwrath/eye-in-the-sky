import {createAction, props} from '@ngrx/store';
import {Campus} from '../models/campus.model';

export const addCampus = createAction('[Campus] Add Campus', props<{ campus: Campus }>());
export const selectCampus = createAction('[Campus] Select Campus', props<{ campus: Campus }>());
export const selectCampusByTitle = createAction('[Campus] Select Campus By Title', props<{ campusTitle: string }>());
export const deselectCampus = createAction('[Campus] Deselect Campus');
