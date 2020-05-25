import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {routerNavigatedAction} from '@ngrx/router-store';
import {tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from './reducers';
import {Campus} from '../models/campus.model';
import {Floor} from '../models/floor.model';
import {deselectCampus, selectCampus, selectCampusByTitle} from './campus.actions';
import {deselectFloor, selectFloorByTitle} from './floor.actions';

@Injectable()
export class RouterEffects {
  private selectedCampus: Campus | null = null;
  private selectedFloor: Floor | null = null;
  private previousURI: string | null = null;
  private campuses: Campus[] | null = null;

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
      .select(state => state.campus.campuses)
      .subscribe(campuses => this.campuses = campuses);
    // TODO Same for room / pc
  }

  @Effect({dispatch: false})
  onRouterNavigate = this.actions.pipe(
    ofType(routerNavigatedAction),
    tap(action => {
      if (action.payload.routerState.url !== this.previousURI) {
        this.previousURI = action.payload.routerState.url;

        const decodedTitle = decodeURI(action.payload.routerState.url).substr(1);

        if (decodedTitle.length > 0) {
          const campusFromURI = this.campuses.find(campus => campus.title === decodedTitle);

          if (campusFromURI && campusFromURI !== this.selectedCampus) {
            this.store.dispatch(selectCampus({campus: campusFromURI}));
          }
        } else {
          const routeParamMap = action.payload.routerState.root.paramMap;

          if (routeParamMap) {
            const campusTitleFromSnapshot = routeParamMap.get('campus');

            if (campusTitleFromSnapshot !== null && campusTitleFromSnapshot !== this.selectedCampus.title) {
              console.log(1);
              this.store.dispatch(selectCampusByTitle({campusTitle: campusTitleFromSnapshot}));
            } else if (campusTitleFromSnapshot === null && this.selectedCampus !== null) {
              console.log(2);
              this.store.dispatch(deselectCampus());
            }

            const floorTitleFromSnapshot = routeParamMap.get('floor');
            if (floorTitleFromSnapshot !== null && floorTitleFromSnapshot !== this.selectedFloor.title) {
              console.log(3);
              this.store.dispatch(selectFloorByTitle({floorTitle: floorTitleFromSnapshot}));
            } else if (floorTitleFromSnapshot === null && this.selectedFloor !== null) {
              console.log(4);
              this.store.dispatch(deselectFloor());
            }
          }
        }
      }
    })
  );
}
