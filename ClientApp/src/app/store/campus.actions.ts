import {createAction, props} from "@ngrx/store";
import {Campus} from '../models/campus.model';

export const selectCampus = createAction('[Campus] Select Campus', props<{ campus: Campus }>());
export const addCampus = createAction('[Campus] Add Campus', props<{ campus: Campus }>());
