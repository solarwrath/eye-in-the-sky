import {Component, OnInit} from '@angular/core';
import {AppState} from './store/reducers';
import {Store} from '@ngrx/store';
import {addCampus} from './store/campus.actions';
import {MenuItem} from './main/main.component';
import {Campus} from './models/campus.model';
import {addFloor} from './store/floor.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
  }
}
