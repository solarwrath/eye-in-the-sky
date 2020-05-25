import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as ClassRoomActions from './class-room.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppState} from './reducers';
import {Store} from '@ngrx/store';
import {Campus} from '../models/campus.model';
import {Floor} from '../models/floor.model';
import {ClassRoom} from '../models/class-room.model';

@Injectable()
export class ClassRoomEffects {
  private selectedCampus: Campus | null = null;
  private selectedFloor: Floor | null = null;
  private previouslySelectedClassRoom: ClassRoom | null = null;
  private currentlySelectedClassRoom: ClassRoom | null = null;

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
      .select(state => state.classRoom.selectedClassRoom)
      .subscribe(newSelectedClassRoom => {
        this.previouslySelectedClassRoom = this.currentlySelectedClassRoom;
        this.currentlySelectedClassRoom = newSelectedClassRoom;
      });
  }

  @Effect({dispatch: false})
  navigateOnClassRoomSelection = this.actions.pipe(
    ofType(ClassRoomActions.selectClassRoom),
    tap((action) => {
      if (this.previouslySelectedClassRoom !== action.classRoom) {
        this.router.navigate([`/${this.selectedCampus.title}/${this.selectedFloor.title}/${action.classRoom.title}`]);
      }
    })
  );

  @Effect({dispatch: false})
  navigateOnClassRoomSelectionByTitle = this.actions.pipe(
    ofType(ClassRoomActions.selectClassRoomByTitle),
    tap((action) => {
      if (this.previouslySelectedClassRoom.title !== action.classRoomTitle) {
        this.router.navigate([`/${this.selectedCampus.title}/${this.selectedFloor.title}/${action.classRoomTitle}`]);
      }
    })
  );

  @Effect({dispatch: false})
  navigateOnClassRoomDeselection = this.actions.pipe(
    ofType(ClassRoomActions.deselectClassRoom),
    tap(() => this.router.navigate([`/${this.selectedCampus.title}/${this.selectedFloor.title}`]))
  );
}
