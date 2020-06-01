import {Action, createReducer, on} from '@ngrx/store';
import * as FloorActions from '../floor/floor.actions';
import * as CampusActions from '../campus/campus.actions';
import * as RoomActions from './room.actions';
import {Floor} from '../../models/floor.model';
import {AppState} from '../reducers';
import {Room} from '../../models/room.model';

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
  on(RoomActions.insertRoom, (state, {roomTitle, floorId}) => {
    const roomWithSuchTitle = state.rooms.find((room: Room) => room.title === roomTitle);
    if (!roomWithSuchTitle) {
      return {
        ...state,
        rooms: [...state.rooms, new Room(roomTitle, floorId)],
      };
    }

    return {
      ...state,
    };
  }),
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

export function roomReducer(state: RoomState | undefined, action: Action) {
  return _roomReducer(state, action);
}
