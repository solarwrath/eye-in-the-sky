import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RoomActions from './room.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppState} from './reducers';
import {Store} from '@ngrx/store';
import {Campus} from '../models/campus.model';
import {Floor} from '../models/floor.model';
import {Room} from '../models/room.model';

@Injectable()
export class RoomEffects {
  private selectedCampus: Campus | null = null;
  private selectedFloor: Floor | null = null;
  private previouslySelectedRoom: Room | null = null;
  private currentlySelectedRoom: Room | null = null;

  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.store
      .select(state => state.campus.selectedCampus)
      .subscribe(newSelectedCampus => this.selectedCampus = newSelectedCampus);
    this.store
      .select(state => state.floor.selectedFloor)
      .subscribe(newSelectedFloor => {
        this.selectedFloor = newSelectedFloor;
      });
    this.store
      .select(state => state.room.selectedRoom)
      .subscribe(room => {
        this.previouslySelectedRoom = this.currentlySelectedRoom;
        this.currentlySelectedRoom = room;
      });
  }

  @Effect({dispatch: false})
  navigateOnRoomSelection = this.actions.pipe(
    ofType(RoomActions.selectRoom),
    tap((action) => {
      if (this.previouslySelectedRoom !== action.room) {
        this.router.navigate([`/${this.selectedCampus.title}/${this.selectedFloor.title}/${action.room.title}`]);
      }
    })
  );

  @Effect({dispatch: false})
  navigateOnRoomSelectionByTitle = this.actions.pipe(
    ofType(RoomActions.selectRoomByTitle),
    tap((action) => {
      if (this.previouslySelectedRoom.title !== action.roomTitle) {
        this.router.navigate([`/${this.selectedCampus.title}/${this.selectedFloor.title}/${action.roomTitle}`]);
      }
    })
  );

  @Effect({dispatch: false})
  navigateOnRoomDeselection = this.actions.pipe(
    ofType(RoomActions.deselectRoom),
    tap(() => {
      if (this.selectedCampus != null && this.selectedFloor != null) {
        this.router.navigate([`/${this.selectedCampus.title}/${this.selectedFloor.title}`]);
      }
    })
  );
}
