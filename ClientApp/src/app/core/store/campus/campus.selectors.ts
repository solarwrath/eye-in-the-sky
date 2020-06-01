import {Campus} from '../../models/campus.model';
import {AppState} from '../reducers';

export const getCampusByTitle = (state: AppState, campusTitle: string): Campus | null => {
  const foundCampus = state.campus.campuses.find(campus => campus.title === campusTitle);
  return foundCampus === undefined ? null : foundCampus;
};
