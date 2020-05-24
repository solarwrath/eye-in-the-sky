import {ActionReducerMap} from '@ngrx/store';
import * as fromCampus from './campus.reducer';
import * as fromFloor from './floor.reducer';

export interface AppState {
  campus: fromCampus.CampusState;
  floor: fromFloor.FloorState;
}

export const reducers: ActionReducerMap<AppState> = {
  campus: fromCampus.campusReducer,
  floor: fromFloor.floorReducer,
};
