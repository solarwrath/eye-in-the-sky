import {Action, createReducer, on} from '@ngrx/store';
import * as FloorActions from '../floor/floor.actions';
import * as CampusActions from '../campus/campus.actions';
import * as RoomActions from '../room/room.actions';
import * as PCActions from './pc.actions';
import {AppState} from '../reducers';
import {Room} from '../../models/room.model';
import {PC} from '../../models/pc.model';

export interface PCState {
  selectedPC: PC | null;
  pcs: PC[];
}

const initialState: PCState = {
  selectedPC: null,
  pcs: [],
};

// tslint:disable-next-line:variable-name
export const _pcReducer = createReducer(
  initialState,
  on(PCActions.addPC, (state, {pc}) => {
    return {
      ...state,
      pcs: [...state.pcs, pc],
    };
  }),
  on(PCActions.updatePCData, (state, {id, newData}) => {
    const copiedPCs = [...state.pcs];

    const foundPCIndex = copiedPCs.findIndex(pc => pc.id === id);
    if (foundPCIndex !== -1) {
      const editedPC = {
        ...copiedPCs[foundPCIndex]
      };
      editedPC.data = newData;
      copiedPCs.splice(foundPCIndex, 1, editedPC);
    }

    return {
      ...state,
      pcs: copiedPCs,
    };
  }),
  on(PCActions.selectPC, (state, {pc}) => {
    return {
      ...state,
      selectedPC: pc,
    };
  }),
  on(PCActions.selectPCByName, (state, {pcName}) => {
    return {
      ...state,
      selectedPC: state.pcs.find(pc => pc.data.pcName === pcName),
    };
  }),
  on(PCActions.selectPCById, (state, {id}) => {
    return {
      ...state,
      selectedPC: state.pcs.find(pc => pc.id === id),
    };
  }),
  on(PCActions.deselectPC, (state) => {
    return {
      ...state,
      selectedPC: null,
    };
  }),
  on(RoomActions.selectRoom, (state) => {
    return {
      ...state,
      selectedPC: null,
    };
  }),
  on(RoomActions.selectRoomByTitle, (state) => {
    return {
      ...state,
      selectedPC: null,
    };
  }),
  on(RoomActions.deselectRoom, (state) => {
    return {
      ...state,
      selectedPC: null,
    };
  }),
  on(FloorActions.selectFloor, (state) => {
    return {
      ...state,
      selectedPC: null,
    };
  }),
  on(FloorActions.selectFloorByTitle, (state) => {
    return {
      ...state,
      selectedPC: null,
    };
  }),
  on(FloorActions.deselectFloor, (state) => {
    return {
      ...state,
      selectedPC: null,
    };
  }),
  on(CampusActions.selectCampus, (state) => {
    return {
      ...state,
      selectedPC: null,
    };
  }),
  on(CampusActions.deselectCampus, (state) => {
    return {
      ...state,
      selectedPC: null,
    };
  }),
  on(CampusActions.selectCampusByTitle, (state) => {
    return {
      ...state,
      selectedPC: null,
    };
  }),
  )
;

export const getPCsOfRoom = (state: AppState, room: Room): PC[] => {
  return state.pc.pcs.filter(pcData => pcData.roomId === room.id);
};

export const getPCsOfSelectedRoom = (state: AppState): PC[] | null => {
  if (state.room.selectedRoom != null) {
    return getPCsOfRoom(state, state.room.selectedRoom);
  }

  return null;
};

export function pcReducer(state: PCState | undefined, action: Action) {
  return _pcReducer(state, action);
}
