import {ActionReducerMap} from '@ngrx/store';
import * as fromCampus from './campus.reducer';
import * as fromFloor from './floor.reducer';
import * as fromRoom from './room.reducer';

export interface AppState {
  campus: fromCampus.CampusState;
  floor: fromFloor.FloorState;
  room: fromRoom.RoomState;
}

export const reducers: ActionReducerMap<AppState> = {
  campus: fromCampus.campusReducer,
  floor: fromFloor.floorReducer,
  room: fromRoom.roomReducer,
};
