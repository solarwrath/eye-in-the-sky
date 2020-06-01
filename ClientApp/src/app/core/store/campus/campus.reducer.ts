import {Campus} from '../../models/campus.model';
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

// tslint:disable-next-line:variable-name
export const _campusReducer = createReducer(
  initialState,
  on(CampusActions.insertCampus, (state, {campusTitle}) => {
    const campusWithSuchTitle = state.campuses.find((campus: Campus) => campus.title === campusTitle);
    if (!campusWithSuchTitle) {
      return {
        ...state,
        campuses: [...state.campuses, new Campus(campusTitle)],
      };
    }

    return {
      ...state,
    };
  }),
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
  }),
  on(CampusActions.selectCampusByTitle, (state, {campusTitle}) => {
    return {
      ...state,
      selectedCampus: state.campuses.find(campus => campus.title === campusTitle),
    };
  }),
  on(CampusActions.deselectCampus, (state) => {
    return {
      ...state,
      selectedCampus: null,
    };
  })
);

export function campusReducer(state: CampusState | undefined, action: Action) {
  return _campusReducer(state, action);
}
