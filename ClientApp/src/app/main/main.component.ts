import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import Builder from '@rob10e/svg-path-js';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public campuses: MenuItem[];
  public selectedCampus: MenuItem | null = null;
  public selectedFloor: MenuItem | null = null;
  public selectedPC: MenuItem | null = null;
  public firstTimeActivePathShown = true;

  @ViewChild('activePath')
  public activePath: ElementRef<SVGPathElement>;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

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
  }

  ngOnInit(): void {
    const rootA = new MenuItem({title: 'rootOptio nA'});
    const childA = new MenuItem({title: 'childToA sad'});
    const childChildA = new MenuItem({title: 'aaaaa '});

    childA.children.push(childChildA);
    rootA.children.push(childA);

    const rootB = new MenuItem({title: 'rootOptionB'});

    this.campuses = [rootA, rootB];

    for (let i = 0; i < 100; i++) {
      this.campuses.push(new MenuItem({title: `${i}`}));
    }

    this.sortCampuses();

    this.handleRoute(this.activatedRoute.snapshot.paramMap);
    this.activatedRoute.paramMap.subscribe(map => this.handleRoute(map));
  }
}

export class MenuItem {
  public name: string;
  public children: MenuItem[] | null;

  public constructor(options: { title: string, children?: MenuItem[] | null }) {
    this.name = options.title;
    if (options.children === null || options.children === undefined) {
      this.children = [];
    } else {
      this.children = options.children;
    }
  }
}
