import {Action, createReducer, on} from '@ngrx/store';
import * as FloorActions from './floor.actions';
import * as CampusActions from './campus.actions';
import * as RoomActions from './room.actions';
import {Floor} from '../models/floor.model';
import {AppState} from './reducers';
import {Room} from '../models/room.model';

export interface RoomState {
  selectedRoom: Room | null;
  rooms: Room[];
}

const initialState: RoomState = {
  selectedRoom: null,
  rooms: [],
};

// tslint:disable-next-line:variable-name
export const _roomReducer = createReducer(
  initialState,
  on(RoomActions.addRoom, (state, {room}) => {
    return {
      ...state,
      rooms: [...state.rooms, room],
    };
  }),
  on(RoomActions.selectRoom, (state, {room}) => {
    return {
      ...state,
      selectedRoom: room,
    };
  }),
  on(RoomActions.selectRoomByTitle, (state, {roomTitle}) => {
    return {
      ...state,
      selectedRoom: state.rooms.find(room => room.title === roomTitle),
    };
  }),
  on(RoomActions.deselectRoom, (state) => {
    return {
      ...state,
      selectedRoom: null,
    };
  }),
  on(FloorActions.selectFloor, (state) => {
    return {
      ...state,
      selectedRoom: null,
    };
  }),
  on(FloorActions.selectFloorByTitle, (state) => {
    return {
      ...state,
      selectedRoom: null,
    };
  }),
  on(FloorActions.deselectFloor, (state) => {
    return {
      ...state,
      selectedRoom: null,
    };
  }),
  on(CampusActions.selectCampus, (state) => {
    return {
      ...state,
      selectedRoom: null,
    };
  }),
  on(CampusActions.deselectCampus, (state) => {
    return {
      ...state,
      selectedRoom: null,
    };
  }),
  on(CampusActions.selectCampusByTitle, (state) => {
    return {
      ...state,
      selectedRoom: null,
    };
  }),
);

export const getRoomsOfFloor = (state: AppState, floor: Floor): Room[] => {
  return state.room.rooms.filter(room => room.floorId === floor.id);
};

export const getRoomsOfSelectedFloor = (state: AppState): Room[] | null => {
  if (state.floor.selectedFloor != null) {
    return getRoomsOfFloor(state, state.floor.selectedFloor);
  }

  return null;
};

export function roomReducer(state: RoomState | undefined, action: Action) {
  return _roomReducer(state, action);
}
