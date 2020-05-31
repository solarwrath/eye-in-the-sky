import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main-views/main/main.component';
import {AuthGuard} from './components/auth/auth-guard';
import {AuthComponent} from './components/auth/auth.component';
import {LoginAndSignUpRedirectGuard} from './components/auth/login-and-sign-up-redirect-guard.service';

const routes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {
    path: 'auth/:action',
    component: AuthComponent,
    canActivate: [LoginAndSignUpRedirectGuard],
  },
  {path: ':campus/:floor/:room/:pc', component: MainComponent, canActivate: [AuthGuard]},
  {path: ':campus/:floor/:room', component: MainComponent, canActivate: [AuthGuard]},
  {path: ':campus/:floor', component: MainComponent, canActivate: [AuthGuard]},
  {path: ':campus', component: MainComponent, canActivate: [AuthGuard]},
  {path: '**', component: MainComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
