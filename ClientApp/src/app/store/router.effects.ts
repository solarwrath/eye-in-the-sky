import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {routerNavigatedAction} from '@ngrx/router-store';
import {tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from './reducers';
import {Campus} from '../models/campus.model';
import {Floor} from '../models/floor.model';
import {selectCampus} from './campus.actions';
import {selectFloor} from './floor.actions';
import {ClassRoom} from '../models/class-room.model';
import {selectClassRoom} from './class-room.actions';

@Injectable()
export class RouterEffects {
  private selectedCampus: Campus | null = null;
  private selectedFloor: Floor | null = null;
  private selectedClassRoom: ClassRoom | null = null;
  private previousURI: string | null = null;
  private campuses: Campus[] | null = null;
  private floors: Floor[] | null = null;
  private classRooms: ClassRoom[] | null = null;

  constructor(
    private actions: Actions,
    private store: Store<AppState>,
  ) {
    this.store
      .select(state => state.campus.selectedCampus)
      .subscribe(newSelectedCampus => this.selectedCampus = newSelectedCampus);
    this.store
      .select(state => state.floor.selectedFloor)
      .subscribe(newSelectedFloor => this.selectedFloor = newSelectedFloor);
    this.store
      .select(state => state.classRoom.selectedClassRoom)
      .subscribe(newSelectedClassRoom => this.selectedClassRoom = newSelectedClassRoom);

    this.store
      .select(state => state.campus.campuses)
      .subscribe(newCampuses => this.campuses = newCampuses);
    this.store
      .select(state => state.floor.floors)
      .subscribe(newFloors => this.floors = newFloors);
    this.store
      .select(state => state.classRoom.classRooms)
      .subscribe(newClassRooms => this.classRooms = newClassRooms);
    // TODO Same for pc
  }

  @Effect({dispatch: false})
  onRouterNavigate = this.actions.pipe(
    ofType(routerNavigatedAction),
    tap(action => {
        if (action.payload.routerState.url !== this.previousURI) {
          this.previousURI = action.payload.routerState.url;

          const encodedCampusTitle = action.payload.routerState.root.firstChild.params.campus;
          if (encodedCampusTitle) {
            const decodedCampusTitle = decodeURI(encodedCampusTitle);
            const campusFromURI: Campus | null = this.campuses.find(campus => campus.title === decodedCampusTitle);

            if (campusFromURI && campusFromURI !== this.selectedCampus) {
              this.store.dispatch(selectCampus({campus: campusFromURI}));

              const encodedFloorTitle = action.payload.routerState.root.firstChild.params.floor;
              if (encodedFloorTitle) {
                const decodedFloorTitle = decodeURI(encodedFloorTitle);
                const floorFromURI: Floor | null = this.floors.find(floor => floor.title === decodedFloorTitle);

                if (floorFromURI && floorFromURI !== this.selectedFloor) {
                  this.store.dispatch(selectFloor({floor: floorFromURI}));

                  const encodedClassRoomTitle = action.payload.routerState.root.firstChild.params.classRoom;
                  if (encodedClassRoomTitle) {
                    const decodedClassRoomTitle = decodeURI(encodedClassRoomTitle);
                    const classRoomFromURI: ClassRoom | null = this.classRooms.find(classRoom => classRoom.title === decodedClassRoomTitle);

                    if (classRoomFromURI && classRoomFromURI !== this.selectedClassRoom) {
                      this.store.dispatch(selectClassRoom({classRoom: classRoomFromURI}));
                    }
                  }
                }
              }
            }
          }
        }
      }
    )
  );
}
