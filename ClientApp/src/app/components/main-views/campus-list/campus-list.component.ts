import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppState} from '../../../core/store/reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Campus} from '../../../core/models/campus.model';
import {deselectCampus, selectCampus} from '../../../core/store/campus/campus.actions';
import Typewriter from '../../../typewriter/typewriter';

@Component({
  selector: 'app-campus-list',
  templateUrl: './campus-list.component.html',
  styleUrls: ['./campus-list.component.scss']
})
export class CampusListComponent implements OnInit, AfterViewInit {
  public availableForSelectionCampuses: Observable<Campus[]> =
    this.store.select(
      state => state.campus.campuses.filter(campus => campus !== state.campus.selectedCampus)
    );

  public selectedCampus: Campus | null = null;

  @ViewChild('selectedCampusTitle')
  public selectedCampusTitleElement: ElementRef<HTMLSpanElement>;
  private typewriter: Typewriter | null = null;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store
      .select(state => state.campus.selectedCampus)
      .subscribe(newSelectedCampus => this.selectedCampus = newSelectedCampus);
  }

  ngAfterViewInit(): void {
    this.typewriter = new Typewriter({
      target: this.selectedCampusTitleElement.nativeElement,
      initialText: this.selectedCampus !== null ? this.selectedCampus.title : '',
      period: 1500,
      terminalText: '_'
    }, {
      animateAppearance: true,
    });

    this.store
      .select(state => state.campus.selectedCampus)
      .subscribe(newSelectedCampus => {
        this.typewriter.changeText(newSelectedCampus == null ? '' : newSelectedCampus.title);
      });
  }

  public onSelectCampus(event: any, campus: Campus): void {
    this.store.dispatch(selectCampus({campus}));
  }

  public onDeselectCampus(): void {
    this.store.dispatch(deselectCampus());
  }
}
