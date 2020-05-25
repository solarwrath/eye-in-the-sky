import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as FloorActions from './floor.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppState} from './reducers';
import {Store} from '@ngrx/store';
import {Campus} from '../models/campus.model';
import {Floor} from '../models/floor.model';

@Injectable()
export class FloorEffects {
  private selectedCampus: Campus | null = null;
  private selectedFloor: Floor | null = null;

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
      .subscribe(newSelectedFloor => this.selectedFloor = newSelectedFloor);
  }

  @Effect()
  navigateOnFloorSelection = this.actions.pipe(
    ofType(FloorActions.selectFloor),
    tap((action) => {
      if (this.selectedFloor !== action.floor) {
        this.router.navigate([`/${encodeURI(this.selectedCampus.title)}/${encodeURI(action.floor.title)}`]);
      }
    })
  );

  @Effect()
  navigateOnFloorSelectionByTitle = this.actions.pipe(
    ofType(FloorActions.selectFloorByTitle),
    tap((action) => {
      if (this.selectedFloor.title !== action.floorTitle) {
        this.router.navigate([`/${encodeURI(this.selectedCampus.title)}/${encodeURI(action.floorTitle)}`]);
      }
    })
  );

  @Effect()
  navigateOnFloorDeselection = this.actions.pipe(
    ofType(FloorActions.deselectFloor),
    tap(() => this.router.navigate([`/${encodeURI(this.selectedCampus.title)}`]))
  );
}
