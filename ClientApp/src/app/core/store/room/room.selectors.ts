import {AppState} from '../reducers';
import {Floor} from '../../models/floor.model';
import {Campus} from '../../models/campus.model';
import {Room} from '../../models/room.model';

export const getRoomByTitle = (state: AppState, roomTitle: string): Room | null => {
  const foundRoom = state.room.rooms.find(room => room.title === roomTitle);
  return foundRoom === undefined ? null : foundRoom;
};

export const getRoomsOfFloor = (state: AppState, floor: Floor): Room[] => {
  return state.room.rooms.filter(room => room.floorId === floor.id);
};

export const getRoomsOfSelectedFloor = (state: AppState): Room[] | null => {
  if (state.floor.selectedFloor != null) {
    return getRoomsOfFloor(state, state.floor.selectedFloor);
  }

  return null;
};
