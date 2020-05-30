import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {animate, animateChild, group, query, state, style, transition, trigger} from '@angular/animations';

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
        animate('1500ms ease')]
      ),
     transition('login => sign-up', [
       query('app-login-component', [
         style({
           opacity: 1,
           transform: 'scale(1)'
         }),
         animate('500ms', style({
           opacity: 0,
           transform: 'scale(0)'
         })),
       ]),
       query('app-sign-up-component', [
         style({
           opacity: 1,
           transform: 'scale(1)'
         }),
         animate('500ms', style({
           opacity: 0,
           transform: 'scale(0)'
         })),
       ]),
     ])
    ]),
  ]
})

export class AuthComponent implements OnInit {
  public showLogin = true;
  public currentMode = 'login';

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(newParams => {
      this.showLogin = newParams.get('action') === 'login';
      this.currentMode = newParams.get('action');
    });
  }
}
