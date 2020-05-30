import {Component, OnInit} from '@angular/core';
import {AppState} from './core/store/reducers';
import {Store} from '@ngrx/store';
import {addCampus} from './core/store/campus/campus.actions';
import {Campus} from './core/models/campus.model';
import {addFloor} from './core/store/floor/floor.actions';
import {addRoom} from './core/store/room/room.actions';
import {addPC} from './core/store/pc/pc.actions';
import {RouterOutlet} from '@angular/router';
import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('LoginPage => SignUpPage', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            width: '100%',
            opacity: 0,
            transform: 'scale(0) translateY(100%)',
          }),
        ]),
        query(':enter', [
          animate('600ms ease',
            style({opacity: 1, transform: 'scale(1) translateY(0)'}))
        ]),
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(addCampus({
      campus: new Campus(
        1, 'Перший'
      )
    }));

    this.store.dispatch(addCampus({
      campus: new Campus(
        2, 'Другий'
      )
    }));

    for (let i = 3; i < 20; i++) {
      this.store.dispatch(addCampus({
        campus: new Campus(
          i, `Корпус з індексом: ${i}`
        )
      }));
    }

    this.store.dispatch(addFloor({
        floor: {
          id: 1,
          title: 'Подвал!!!',
          campusId: 1,
        }
      })
    );

    this.store.dispatch(addFloor({
        floor: {
          id: 2,
          title: 'Не знаю!!!',
          campusId: 1,
        }
      })
    );

    this.store.dispatch(addFloor({
        floor: {
          id: 3,
          title: 'Вжжвжвжжвж!!!',
          campusId: 2,
        }
      })
    );

    this.store.dispatch(addRoom({
        room: {
          id: 1,
          title: 'Класс рум1!!!',
          floorId: 1,
        }
      })
    );

    this.store.dispatch(addRoom({
        room: {
          id: 2,
          title: 'Класс рум2!!!',
          floorId: 1,
        }
      })
    );

    this.store.dispatch(addRoom({
        room: {
          id: 3,
          title: 'Класс рум3!!!',
          floorId: 2,
        }
      })
    );

    this.store.dispatch(addPC({
        pc: {
          id: 1,
          roomId: 1,
          pcName: 'pcName',
          data: 'pcData'
        }
      })
    );

    this.store.dispatch(addPC({
        pc: {
          id: 2,
          roomId: 1,
          pcName: 'pcaName',
          data: 'pcD2ata'
        }
      })
    );
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
