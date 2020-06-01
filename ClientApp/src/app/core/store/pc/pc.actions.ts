import {createAction, props} from '@ngrx/store';
import {PC} from '../../models/pc.model';
import {PCData} from '../../models/pc-data.model';

export const setPCData = createAction('[PC] Set PC Data', props<{ data: PCData, roomId: number }>());
export const updatePCData = createAction('[PC] Update PC Data', props<{ data: PCData, clientName: string }>());
export const addPC = createAction('[PC] Add PC', props<{ pc: PC }>());
export const selectPC = createAction('[PC] Select PC', props<{ pc: PC }>());
export const selectPCByName = createAction('[PC] Select PC By Title', props<{ clientName: string }>());
export const selectPCById = createAction('[PC] Select PC By Id', props<{ id: number }>());
export const deselectPC = createAction('[PC] Deselect PC');
