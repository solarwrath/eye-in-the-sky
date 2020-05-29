import {ActionReducerMap} from '@ngrx/store';
import * as fromCampus from './campus.reducer';
import * as fromFloor from './floor.reducer';
import * as fromRoom from './room.reducer';
import * as fromPC from './pc.reducer';
import * as fromAuth from './auth.reducer';

export interface AppState {
  campus: fromCampus.CampusState;
  floor: fromFloor.FloorState;
  room: fromRoom.RoomState;
  pc: fromPC.PCState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  campus: fromCampus.campusReducer,
  floor: fromFloor.floorReducer,
  room: fromRoom.roomReducer,
  pc: fromPC.pcReducer,
  auth: fromAuth.authReducer,
};
