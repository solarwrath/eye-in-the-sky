import {createAction, props} from '@ngrx/store';
import {Floor} from '../../models/floor.model';

export const insertFloor = createAction('[Floor] Insert Floor', props<{ floorTitle: string, campusId: number }>());
export const addFloor = createAction('[Floor] Add Floor', props<{ floor: Floor }>());
export const selectFloor = createAction('[Floor] Select Floor', props<{ floor: Floor }>());
export const selectFloorByTitle = createAction('[Floor] Select Floor By Title', props<{ floorTitle: string }>());
export const deselectFloor = createAction('[Floor] Deselect Floor');
