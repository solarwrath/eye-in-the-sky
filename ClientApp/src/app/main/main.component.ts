import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import Builder from '@rob10e/svg-path-js';
import anime from 'animejs/lib/anime.es.js';
import {animate, state, style, transition, trigger} from '@angular/animations';
import Typewriter from '../typewriter/typewriter';
import {CampusState} from '../store/campus.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {addCampus, selectCampus} from '../store/campus.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent/* implements OnInit, AfterViewInit*/ {

  // public campusSelectedId: Observable<number | null> = this.campusStore.select(state => state.selectedCampusId).pipe(tap(a => console.log(a)));

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private campusStore: Store<CampusState>) {
  }

/*
  public campuses: MenuItem[];
  public selectedCampus: MenuItem | null = null;
  public selectedFloor: MenuItem | null = null;
  public selectedPC: MenuItem | null = null;
  public firstTimeActivePathShown = true;

  @ViewChild('activePath')
  public activePath: ElementRef<SVGPathElement>;

  public animState = 'normal';

  @ViewChild('selectedCampusTitle')
  public selectedCampusTitleElement: ElementRef<HTMLSpanElement>;

  private textRotate: Typewriter | null = null;

  public clearSelectedCampus() {
    if (this.selectedCampus !== null) {
      this.campuses.push(this.selectedCampus);
      this.sortCampuses();
      this.router.navigate(['']);
    }
  }

  private sortCampuses() {
    this.campuses.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      }

      return 0;
    });
  }

  private handleRoute(map: ParamMap) {
    if (map.get('campus') !== null) {
      const decodedCampusTitle = decodeURI(map.get('campus'));

      if (this.selectedCampus === null || decodedCampusTitle !== this.selectedCampus.name) {
        const previousSelectedCampus = this.selectedCampus;

        this.selectedCampus = this.campuses.splice(this.campuses.findIndex(campus => campus.name === decodedCampusTitle), 1)[0];
        this.campusStore.dispatch(selectCampus({campusTitle: this.selectedCampus.name}));

        if (this.textRotate !== null) {
          this.textRotate.changeText(this.selectedCampus.name);
        }

        this.animState = 'gone';

        setTimeout(() => {
          this.animState = 'coming';
          this.animState = 'normal';
        }, 3000);

        if (previousSelectedCampus !== null) {
          this.campuses.push(previousSelectedCampus);
        }

        this.sortCampuses();
      }
    } else {
      this.selectedCampus = null;
    }

    if (map.get('floor') !== null) {
      const decodedFloorTitle = decodeURI(map.get('floor'));
      this.selectedFloor = this.selectedCampus.children.find(floor => floor.name === decodedFloorTitle);
    } else {
      this.selectedFloor = null;
    }

    if (map.get('pc') !== null) {
      const decodedFloorPC = decodeURI(map.get('pc'));
      this.selectedPC = this.selectedFloor.children.find(pc => pc.name === decodedFloorPC);
    } else {
      this.selectedPC = null;
    }
  }

  public onCampusSelect(event: any, campus: MenuItem) {
    this.router.navigate([`/${encodeURI(campus.name)}`]);
  }

  ngOnInit(): void {
    const rootA = new MenuItem({title: 'rootOptio nA'});
    const childA = new MenuItem({title: 'childToA sad'});
    const childChildA = new MenuItem({title: 'aaaaa '});

    childA.children.push(childChildA);
    rootA.children.push(childA);

    const rootB = new MenuItem({title: 'rootOptionB'});

    // @ts-ignore
    this.campusStore.dispatch(addCampus({campus: r  ootA}));
    // @ts-ignore
    this.campusStore.dispatch(addCampus({campus: rootB}));

    this.campuses = [rootA, rootB];

    for (let i = 0; i < 20; i++) {
      const a = new MenuItem({title: `${i}`});
      this.campuses.push(a);
      // @ts-ignore
      this.campusStore.dispatch(addCampus({campus: a}));
    }

    this.sortCampuses();

    this.handleRoute(this.activatedRoute.snapshot.paramMap);
    this.activatedRoute.paramMap.subscribe(map => this.handleRoute(map));
  }

  ngAfterViewInit(): void {
    this.textRotate = new Typewriter({
      target: this.selectedCampusTitleElement.nativeElement,
      initialText: this.selectedCampus !== null ? this.selectedCampus.name : '',
      period: 1500,
      terminalText: '_'
    }, {
      animateAppearance: true,
    });
  }*/
}

export class MenuItem {
  /*public name: string;
  public children: MenuItem[] | null;

  public constructor(options: { title: string, children?: MenuItem[] | null }) {
    this.name = options.title;
    if (options.children === null || options.children === undefined) {
      this.children = [];
    } else {
      this.children = options.children;
    }
  }*/
}
