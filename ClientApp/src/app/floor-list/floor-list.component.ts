import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Typewriter from '../typewriter/typewriter';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducers';
import {Floor} from '../models/floor.model';
import {Observable} from 'rxjs';
import {getFloorsOfSelectedCampus} from '../store/floor.reducer';
import {deselectFloor, selectFloor} from '../store/floor.actions';

@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.scss']
})
export class FloorListComponent implements OnInit, AfterViewInit {
  public availableForSelectionFloors: Observable<Floor[] | null> =
    this.store.select(state => {
      const floorsOfSelectedCampus = getFloorsOfSelectedCampus(state);
      if (floorsOfSelectedCampus !== null) {
        return floorsOfSelectedCampus.filter(floor => floor !== this.selectedFloor);
      }

      return null;
    });
  public selectedFloor: Floor | null = null;

  @ViewChild('selectedFloorTitle')
  public selectedFloorTitleElement: ElementRef<HTMLSpanElement>;
  private typewriter: Typewriter | null = null;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store
      .select(state => state.floor.selectedFloor)
      .subscribe(newSelectedFloor => {
        this.selectedFloor = newSelectedFloor;
      });
  }

  ngAfterViewInit(): void {
    this.typewriter = new Typewriter({
      target: this.selectedFloorTitleElement.nativeElement,
      initialText: this.selectedFloor !== null ? this.selectedFloor.title : '',
      period: 1500,
      terminalText: '_'
    }, {
      animateAppearance: true,
    });

    this.store
      .select(state => state.floor.selectedFloor)
      .subscribe(newSelectedFloor => {
        this.typewriter.changeText(newSelectedFloor == null ? '' : newSelectedFloor.title);
      });
  }

  public onSelectFloor(event: any, floor: Floor): void {
    this.store.dispatch(selectFloor({floor}));
  }

  public onDeselectFloor(): void {
    this.store.dispatch(deselectFloor());
  }
}
