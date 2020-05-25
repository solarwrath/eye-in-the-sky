import {Action, createReducer, on} from '@ngrx/store';
import * as FloorActions from './floor.actions';
import * as CampusActions from './campus.actions';
import * as ClassRoomActions from './class-room.actions';
import {Floor} from '../models/floor.model';
import {AppState} from './reducers';
import {ClassRoom} from '../models/class-room.model';

export interface ClassRoomState {
  selectedClassRoom: ClassRoom | null;
  classRooms: ClassRoom[];
}

const initialState: ClassRoomState = {
  selectedClassRoom: null,
  classRooms: [],
};

// tslint:disable-next-line:variable-name
export const _classRoomReducer = createReducer(
  initialState,
  on(ClassRoomActions.addClassRoom, (state, {classRoom}) => {
    return {
      ...state,
      classRooms: [...state.classRooms, classRoom],
    };
  }),
  on(ClassRoomActions.selectClassRoom, (state, {classRoom}) => {
    return {
      ...state,
      selectedClassRoom: classRoom,
    };
  }),
  on(ClassRoomActions.selectClassRoomByTitle, (state, {classRoomTitle}) => {
    return {
      ...state,
      selectedClassRoom: state.classRooms.find(classRoom => classRoom.title === classRoomTitle),
    };
  }),
  on(ClassRoomActions.deselectClassRoom, (state) => {
    return {
      ...state,
      selectedClassRoom: null,
    };
  }),
  on(FloorActions.selectFloor, (state, {floor}) => {
    return {
      ...state,
      selectedClassRoom: null,
    };
  }),
  on(FloorActions.selectFloorByTitle, (state, {floorTitle}) => {
    return {
      ...state,
      selectedClassRoom: null,
    };
  }),
  on(FloorActions.deselectFloor, (state) => {
    return {
      ...state,
      selectedClassRoom: null,
    };
  }),
  on(CampusActions.selectCampus, (state, {campus}) => {
    return {
      ...state,
      selectedClassRoom: null,
    };
  }),
  on(CampusActions.deselectCampus, (state) => {
    return {
      ...state,
      selectedClassRoom: null,
    };
  }),
  on(CampusActions.selectCampusByTitle, (state) => {
    return {
      ...state,
      selectedClassRoom: null,
    };
  }),
);

export const getClassRoomsOfFloor = (state: AppState, floor: Floor): ClassRoom[] => {
  return state.classRoom.classRooms.filter(classRoom => classRoom.floorId === floor.id);
};

export const getClassRoomsOfSelectedFloor = (state: AppState): ClassRoom[] | null => {
  if (state.floor.selectedFloor != null) {
    return getClassRoomsOfFloor(state, state.floor.selectedFloor);
  }

  return null;
};

export function classRoomReducer(state: ClassRoomState | undefined, action: Action) {
  return _classRoomReducer(state, action);
}
