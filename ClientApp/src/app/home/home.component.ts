import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public campuses: MenuItem[];
  public selectedCampus: MenuItem | null;
  public selectedFloor: MenuItem | null;
  public selectedPC: MenuItem | null;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  private handleRoute(map) {
    if (map['campus'] !== undefined) {
      const decodedCampusTitle = decodeURI(map['campus']);
      this.selectedCampus = this.campuses.find(campus => campus.name === decodedCampusTitle);
    } else {
      this.selectedCampus = null;
    }

    if (map['floor'] !== undefined) {
      const decodedFloorTitle = decodeURI(map['floor']);
      this.selectedFloor = this.selectedCampus.children.find(floor => floor.name === decodedFloorTitle);
    } else {
      this.selectedFloor = null;
    }

    if (map['pc'] !== undefined) {
      const decodedFloorPC = decodeURI(map['pc']);
      this.selectedPC = this.selectedFloor.children.find(pc => pc.name === decodedFloorPC);
    } else {
      this.selectedPC = null;
    }
  }

  public encodeURI(uri: string) {
    return encodeURI(uri);
  }

  ngOnInit(): void {
    const rootA = new MenuItem({title: 'rootOptio nA'});
    const childA = new MenuItem({title: 'childToA sad'});
    const childChildA = new MenuItem({title: 'aaaaa '});

    childA.children.push(childChildA);
    rootA.children.push(childA);

    const rootB = new MenuItem({title: 'rootOptionB'});

    this.campuses = [rootA, rootB];

    this.handleRoute(this.activatedRoute.snapshot);
    this.activatedRoute.params.subscribe(map => this.handleRoute(map));
  }
}

class MenuItem {
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
