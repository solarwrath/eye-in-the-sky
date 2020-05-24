import {Action, createReducer, on} from '@ngrx/store';
import * as FloorActions from './floor.actions';
import * as CampusActions from './campus.actions';
import {Floor} from '../models/floor.model';
import {Campus} from '../models/campus.model';
import {AppState} from './reducers';

export interface FloorState {
  selectedFloor: Floor | null;
  floors: Floor[];
}

const initialState: FloorState = {
  selectedFloor: null,
  floors: [],
};

export const _floorReducer = createReducer(
  initialState,
  on(FloorActions.addFloor, (state, {floor}) => {
    return {
      ...state,
      floors: [...state.floors, floor],
    };
  }),
  on(FloorActions.selectFloor, (state, {floor}) => {
    return {
      ...state,
      selectedFloor: floor,
    };
  }),
  on(CampusActions.selectCampus, (state, {campus}) => {
    return {
      ...state,
      selectedFloor: null,
    };
  })
);

export const getFloorsOfCampus = (state: AppState, campus: Campus): Floor[] => {
  return state.floor.floors.filter(floor => floor.campusId === campus.id);
};

export const getFloorsOfSelectedCampus = (state: AppState): Floor[] | null => {
  if (state.campus.selectedCampus != null) {
    return state.floor.floors.filter(floor => floor.campusId === state.campus.selectedCampus.id);
  }

  return null;
};

export function floorReducer(state: FloorState | undefined, action: Action) {
  return _floorReducer(state, action);
}
