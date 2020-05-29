import {ActionReducerMap} from '@ngrx/store';
import * as fromCampus from './campus/campus.reducer';
import * as fromFloor from './floor/floor.reducer';
import * as fromRoom from './room/room.reducer';
import * as fromPC from './pc/pc.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromAuthGuard from './auth/guard/auth-guard.reducer';

export interface AppState {
  campus: fromCampus.CampusState;
  floor: fromFloor.FloorState;
  room: fromRoom.RoomState;
  pc: fromPC.PCState;
  auth: fromAuth.AuthState;
  authGuard: fromAuthGuard.AuthGuardState;
}

export const reducers: ActionReducerMap<AppState> = {
  campus: fromCampus.campusReducer,
  floor: fromFloor.floorReducer,
  room: fromRoom.roomReducer,
  pc: fromPC.pcReducer,
  auth: fromAuth.authReducer,
  authGuard: fromAuthGuard.authGuardReducer,
};
