import {AppState} from '../reducers';
import {Floor} from '../../models/floor.model';
import {Campus} from '../../models/campus.model';

export const getFloorByTitle = (state: AppState, floorTitle: string): Floor | null => {
  const foundFloor = state.floor.floors.find(floor => floor.title === floorTitle);
  return foundFloor === undefined ? null : foundFloor;
};

export const getFloorsOfCampus = (state: AppState, campus: Campus): Floor[] => {
  return state.floor.floors.filter(floor => floor.campusId === campus.id);
};

export const getFloorsOfSelectedCampus = (state: AppState): Floor[] | null => {
  if (state.campus.selectedCampus != null) {
    return getFloorsOfCampus(state, state.campus.selectedCampus);
  }

  return null;
};
