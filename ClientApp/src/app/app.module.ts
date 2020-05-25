import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {FormEncodedUriPipe} from './form-encoded-uri.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {reducers} from './store/reducers';
import {CampusListComponent} from './campus-list/campus-list.component';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {RouterEffects} from './store/router.effects';
import {CampusEffects} from './store/campus.effects';
import {FloorEffects} from './store/floor.effects';
import { FloorListComponent } from './floor-list/floor-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormEncodedUriPipe,
    CampusListComponent,
    FloorListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgScrollbarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([RouterEffects, CampusEffects, FloorEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
