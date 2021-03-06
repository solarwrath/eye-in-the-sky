import {createAction, props} from '@ngrx/store';
import {PC, PCData} from '../../models/pc.model';

export const addPC = createAction('[PC] Add PC', props<{ pc: PC }>());
export const updatePCData = createAction('[PC] Update PC Data', props<{id: number, newData: PCData }>());
export const selectPC = createAction('[PC] Select PC', props<{ pc: PC }>());
export const selectPCByName = createAction('[PC] Select PC By Title', props<{ pcName: string }>());
export const selectPCById = createAction('[PC] Select PC By Id', props<{ id: number }>());
export const deselectPC = createAction('[PC] Deselect PC');
