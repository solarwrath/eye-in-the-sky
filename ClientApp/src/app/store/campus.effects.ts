import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as CampusActions from './campus.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppState} from './reducers';
import {Store} from '@ngrx/store';
import {Campus} from '../models/campus.model';

@Injectable()
export class CampusEffects {
  private previouslySelectedCampus: Campus | null = null;
  private currentSelectedCampus: Campus | null = null;

  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.store
      .select(state => state.campus.selectedCampus)
      .subscribe(newSelectedCampus => {
          this.previouslySelectedCampus = this.currentSelectedCampus;
          this.currentSelectedCampus = newSelectedCampus;
        }
      );
  }

  @Effect({dispatch: false})
  navigateOnCampusSelect = this.actions.pipe(
    ofType(CampusActions.selectCampus),
    tap((action) => {
      if (this.previouslySelectedCampus !== action.campus) {
        this.router.navigate([action.campus.title]);
      }
    })
  );

  @Effect({dispatch: false})
  navigateOnCampusSelectionByTitle = this.actions.pipe(
    ofType(CampusActions.selectCampusByTitle),
    tap((action) => {
      if (this.previouslySelectedCampus === null || this.previouslySelectedCampus.title !== action.campusTitle) {
        this.router.navigate([action.campusTitle]);
      }
    })
  );

  @Effect({dispatch: false})
  navigateOnCampusDeselection = this.actions.pipe(
    ofType(CampusActions.deselectCampus),
    tap(() => {
      this.router.navigate(['/']);
    })
  );
}
