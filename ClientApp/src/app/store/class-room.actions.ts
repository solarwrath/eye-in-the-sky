import {createAction, props} from '@ngrx/store';
import {ClassRoom} from '../models/class-room.model';

export const addClassRoom = createAction('[Class Room] Add Class Room', props<{ classRoom: ClassRoom }>());
export const selectClassRoom = createAction('[Class Room] Select Class Room', props<{ classRoom: ClassRoom }>());
export const selectClassRoomByTitle = createAction('[Class Room] Select Class Room By Title', props<{ classRoomTitle: string }>());
export const deselectClassRoom = createAction('[Class Room] Deselect Class Room');
