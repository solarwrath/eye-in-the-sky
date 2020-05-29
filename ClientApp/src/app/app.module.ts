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
import {FloorListComponent} from './floor-list/floor-list.component';
import {RoomListComponent} from './room-list/room-list.component';
import {RoomEffects} from './store/room.effects';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {PCEffects} from './store/pc.effects';
import {PcGridComponent} from './pc-grid/pc-grid.component';
import {LoginComponent} from './login/login.component';
import {AuthEffects} from './store/auth.effects';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormEncodedUriPipe,
    CampusListComponent,
    FloorListComponent,
    RoomListComponent,
    PcGridComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgScrollbarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AuthEffects, RouterEffects, CampusEffects, FloorEffects, RoomEffects, PCEffects]),
    StoreRouterConnectingModule.forRoot(),
    FontAwesomeModule,
    NgScrollbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faTimes);
  }
}
