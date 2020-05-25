import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppState} from '../store/reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Campus} from '../models/campus.model';
import {deselectCampus, selectCampus} from '../store/campus.actions';
import Builder from '@rob10e/svg-path-js';
import Typewriter from '../typewriter/typewriter';

@Component({
  selector: 'app-campus-list',
  templateUrl: './campus-list.component.html',
  styleUrls: ['./campus-list.component.scss']
})
export class CampusListComponent implements OnInit, AfterViewInit {
  public campuses: Observable<Campus[]> = this.store.select(state => state.campus.campuses);
  public selectedCampus: Campus | null = null;

  /*
    private firstTimeActivePathShown = true;
    @ViewChild('activePath')
    private activePath: ElementRef<SVGPathElement>;*/

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
    /*
    const boundingRectangle = event.target.getBoundingClientRect();
    const activePathForm = new Builder()
      .moveTo(boundingRectangle.x, boundingRectangle.y)
      .horizontalTo(boundingRectangle.x + 50)
      .verticalTo(boundingRectangle.y + 100)
      .end();

    // Hack to disable no animation when d is not set
    if (this.firstTimeActivePathShown) {
      this.activePath.nativeElement.setAttribute('d', activePathForm);
    }

    // This sequencing fixes glitch, during which full pathForm is shown for a couple of frames and then gets animated
    anime({
      targets: '#activePath',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      direction: 'alternate',
      loop: true
    });

    setTimeout(() => {
      this.activePath.nativeElement.setAttribute('d', activePathForm);
      this.firstTimeActivePathShown = false;
    }, 0);

    */
  }

  public onDeselectCampus(): void {
    this.store.dispatch(deselectCampus());
  }
}
