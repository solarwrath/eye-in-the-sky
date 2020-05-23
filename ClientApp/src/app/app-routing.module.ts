import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';


const routes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full'},
  {path: ':campus/:floor/:pc', component: MainComponent},
  {path: ':campus/:floor', component: MainComponent},
  {path: ':campus', component: MainComponent},
  {path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
