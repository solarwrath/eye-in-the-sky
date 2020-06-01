import {Action, createReducer, on} from '@ngrx/store';
import * as FloorActions from './floor.actions';
import * as CampusActions from '../campus/campus.actions';
import {Floor} from '../../models/floor.model';

export interface FloorState {
  selectedFloor: Floor | null;
  floors: Floor[];
}

const initialState: FloorState = {
  selectedFloor: null,
  floors: [],
};

// tslint:disable-next-line:variable-name
export const _floorReducer = createReducer(
  initialState,
  on(FloorActions.insertFloor, (state, {floorTitle, campusId}) => {
    const floorWithSuchTitle = state.floors.find((floor: Floor) => floor.title === floorTitle);
    if (!floorWithSuchTitle) {
      return {
        ...state,
        floors: [...state.floors, new Floor(floorTitle, campusId)],
      };
    }

    return {
      ...state,
    };
  }),
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
  on(FloorActions.selectFloorByTitle, (state, {floorTitle}) => {
    return {
      ...state,
      selectedFloor: state.floors.find(floor => floor.title === floorTitle)
    };
  }),
  on(FloorActions.deselectFloor, (state) => {
    return {
      ...state,
      selectedFloor: null,
    };
  }),
  on(CampusActions.selectCampus, (state, {campus}) => {
    return {
      ...state,
      selectedFloor: null,
    };
  }),
  on(CampusActions.deselectCampus, (state) => {
    return {
      ...state,
      selectedFloor: null,
    };
  }),
  on(CampusActions.selectCampusByTitle, (state) => {
    return {
      ...state,
      selectedFloor: null,
    };
  }),
);

export function floorReducer(state: FloorState | undefined, action: Action) {
  return _floorReducer(state, action);
}
