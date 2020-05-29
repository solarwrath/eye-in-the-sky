import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as PCActions from './pc.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppState} from '../reducers';
import {Store} from '@ngrx/store';
import {Campus} from '../../models/campus.model';
import {Floor} from '../../models/floor.model';
import {Room} from '../../models/room.model';
import {PC} from '../../models/pc.model';

@Injectable()
export class PCEffects {
  private selectedCampus: Campus | null = null;
  private selectedFloor: Floor | null = null;
  private selectedRoom: Room | null = null;
  private previouslySelectedPC: PC | null = null;
  private currentlySelectedPC: PC | null = null;

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
        this.selectedFloor = newSelectedFloor;
      });
    this.store
      .select(state => state.room.selectedRoom)
      .subscribe(newSelectedRoom => {
        this.selectedRoom = newSelectedRoom;
      });
    this.store
      .select(state => state.pc.selectedPC)
      .subscribe(newSelectedPC => {
        this.previouslySelectedPC = this.currentlySelectedPC;
        this.currentlySelectedPC = newSelectedPC;
      });
  }

  @Effect({dispatch: false})
  navigateOnPCSelection = this.actions.pipe(
    ofType(PCActions.selectPC),
    tap((action) => {
      if (this.previouslySelectedPC !== action.pc) {
        this.router.navigate([`/${this.selectedCampus.title}/${this.selectedFloor.title}/${this.selectedRoom.title}/${action.pc.pcName}`]);
      }
    })
  );

  @Effect({dispatch: false})
  navigateOnPCSelectionByTitle = this.actions.pipe(
    ofType(PCActions.selectPCByName),
    tap((action) => {
      if (this.previouslySelectedPC.pcName !== action.pcName) {
        this.router.navigate([`/${this.selectedCampus.title}/${this.selectedFloor.title}/${this.selectedRoom.title}/${action.pcName}`]);
      }
    })
  );

  @Effect({dispatch: false})
  navigateOnPCDeselection = this.actions.pipe(
    ofType(PCActions.deselectPC),
    tap(() => {
      if (this.selectedCampus != null && this.selectedFloor != null && this.selectedRoom != null) {
        this.router.navigate([`/${this.selectedCampus.title}/${this.selectedFloor.title}/${this.selectedRoom.title}`]);
      }
    })
  );
}
