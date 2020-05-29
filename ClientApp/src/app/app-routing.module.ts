import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main-views/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './auth/auth-guard';
import {LoginRedirectGuard} from './auth/login-redirect-guard';

const routes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard]},
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
