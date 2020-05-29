import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as FloorActions from './floor.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppState} from '../reducers';
import {Store} from '@ngrx/store';
import {Campus} from '../../models/campus.model';
import {Floor} from '../../models/floor.model';

@Injectable()
export class FloorEffects {
  private selectedCampus: Campus | null = null;
  private previouslySelectedFloor: Floor | null = null;
  private currentlySelectedFloor: Floor | null = null;

  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store<AppState>,
  ) {
    // Injectables do not work with lifecycle hooks like ngOnInit, services require it so going for constructor subscription
    this.store
      .select(state => state.campus.selectedCampus)
      .subscribe(newSelectedCampus => this.selectedCampus = newSelectedCampus);
    this.store
      .select(state => state.floor.selectedFloor)
      .subscribe(newSelectedFloor => {
        this.previouslySelectedFloor = this.currentlySelectedFloor;
        this.currentlySelectedFloor = newSelectedFloor;
      });
  }

  @Effect({dispatch: false})
  navigateOnFloorSelection = this.actions.pipe(
    ofType(FloorActions.selectFloor),
    tap((action) => {
      if (this.previouslySelectedFloor !== action.floor) {
        this.router.navigate([`/${this.selectedCampus.title}/${action.floor.title}`]);
      }
    })
  );

  @Effect({dispatch: false})
  navigateOnFloorSelectionByTitle = this.actions.pipe(
    ofType(FloorActions.selectFloorByTitle),
    tap((action) => {
      if (this.previouslySelectedFloor.title !== action.floorTitle) {
        this.router.navigate([`/${this.selectedCampus.title}/${action.floorTitle}`]);
      }
    })
  );

  @Effect({dispatch: false})
  navigateOnFloorDeselection = this.actions.pipe(
    ofType(FloorActions.deselectFloor),
    tap(() => {
      if (this.selectedCampus != null) {
        this.router.navigate([`/${this.selectedCampus.title}`]);
      }
    })
  );
}
