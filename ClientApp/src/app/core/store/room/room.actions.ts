import {createAction, props} from '@ngrx/store';
import {Room} from '../../models/room.model';

export const insertRoom = createAction('[Room] Insert Room', props<{ roomTitle: string, floorId: number }>());
export const addRoom = createAction('[Room] Add Room', props<{ room: Room }>());
export const selectRoom = createAction('[Room] Select Room', props<{ room: Room }>());
export const selectRoomByTitle = createAction('[Room] Select Room By Title', props<{ roomTitle: string }>());
export const deselectRoom = createAction('[Room] Deselect Room');
