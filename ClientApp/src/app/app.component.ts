import {Component, OnInit} from '@angular/core';
import {AppState} from './core/store/reducers';
import {Store} from '@ngrx/store';
import {addCampus} from './core/store/campus/campus.actions';
import {Campus} from './core/models/campus.model';
import {addFloor} from './core/store/floor/floor.actions';
import {addRoom} from './core/store/room/room.actions';
import {addPC, updatePCData} from './core/store/pc/pc.actions';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {loginSucceeded} from './core/store/auth/auth.actions';
import {GeneralHealthStatus} from './core/models/pc.model';

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
    if (sessionStorage.getItem('loggedIn') === 'true') {
      this.store.dispatch(loginSucceeded());
    }

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
          data: {
            pcName: 'pcName',
            generalHealthStatus: GeneralHealthStatus.UNDEFINED,
          }
        }
      })
    );

    this.store.dispatch(addPC({
      pc: {
        id: 2,
        roomId: 1,
        data: {
          pcName: 'pcaName',
          generalHealthStatus: GeneralHealthStatus.HEALTHY,
        }
      }
    }));

    this.store.dispatch(addPC({
      pc: {
        id: 3,
        roomId: 1,
        data: {
          pcName: 'pca2Name',
          generalHealthStatus: GeneralHealthStatus.WARNING,
        }
      }
    }));

    this.store.dispatch(addPC({
        pc: {
          id: 4,
          roomId: 1,
          data: {
            pcName: 'pcaNdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssame',
            generalHealthStatus: GeneralHealthStatus.CRITICAL,
          }
        }
      })
    );
    this.store.dispatch(addPC({
        pc: {
          id: 5,
          roomId: 1,
          data: {
            pcName: 'pcaName',
            generalHealthStatus: GeneralHealthStatus.HEALTHY,
          },
        }
      })
    );

    setTimeout(() => {
      this.store.dispatch(updatePCData({
        id: 4,
        newData: {
          pcName: 'zulul',
          generalHealthStatus: GeneralHealthStatus.WARNING,
        },
      }));
    }, 10000);
  }
}
