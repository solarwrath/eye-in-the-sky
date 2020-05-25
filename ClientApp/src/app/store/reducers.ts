import {ActionReducerMap} from '@ngrx/store';
import * as fromCampus from './campus.reducer';
import * as fromFloor from './floor.reducer';
import * as fromClassRoom from './class-room.reducer';

export interface AppState {
  campus: fromCampus.CampusState;
  floor: fromFloor.FloorState;
  classRoom: fromClassRoom.ClassRoomState;
}

export const reducers: ActionReducerMap<AppState> = {
  campus: fromCampus.campusReducer,
  floor: fromFloor.floorReducer,
  classRoom: fromClassRoom.classRoomReducer,
};
