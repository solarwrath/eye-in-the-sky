import {Campus} from '../models/campus.model';
import {Action, createReducer, on} from '@ngrx/store';
import * as CampusActions from './campus.actions';

export interface CampusState {
  selectedCampus: Campus | null;
  campuses: Campus[];
}

const initialState: CampusState = {
  selectedCampus: null,
  campuses: [],
};

export const _campusReducer = createReducer(
  initialState,
  on(CampusActions.addCampus, (state, {campus}) => {
    return {
      ...state,
      campuses: [...state.campuses, campus],
    };
  }),
  on(CampusActions.selectCampus, (state, {campus}) => {
    return {
      ...state,
      selectedCampus: campus,
    };
  })
);

export function campusReducer(state: CampusState | undefined, action: Action) {
  return _campusReducer(state, action);
}
