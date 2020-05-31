import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import LoginStatus from '../../core/models/login-status.enum';
import {AppState} from '../../core/store/reducers';
import {Store} from '@ngrx/store';
import SignUpStatus from '../../core/models/sign-up-status.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('features-route-animation', [
      state('login', style({
          left: '50%',
        }
      )),
      state('sign-up', style({
          left: '0',
        }
      )),
      transition('login <=> sign-up', [
        animate('1500ms ease')]
      )
    ]),
    trigger('main-part-route-animation', [
        state('login', style({
            left: '0',
          }
        )),
        state('sign-up', style({
            left: '50%',
          }
        )),
        transition('login <=> sign-up', [
            animate('1500ms ease')
          ]
        ),
      ]
    ),
    trigger('crossfade',
      [
        transition(':enter', [
          style({
            opacity: 0,
          }),
          animate('500ms', style({
            opacity: 1,
          })),
        ]),
        transition(':leave', [
          animate('500ms', style({
            opacity: 0,
          }))
        ])
      ])
  ]
})

export class AuthComponent implements OnInit {
  public currentMode = 'login';

  public showLoader: Observable<boolean> = this.store
  // tslint:disable-next-line:no-shadowed-variable
    .select(state => state.auth)
    .pipe(map(authState =>
      authState.loginStatus === LoginStatus.PENDING || authState.signUpStatus === SignUpStatus.PENDING
    ));

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(newParams => {
      this.currentMode = newParams.get('action');
    });
  }
}
