import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './components/main-views/main/main.component';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {reducers} from './core/store/reducers';
import {CampusListComponent} from './components/main-views/campus-list/campus-list.component';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {RouterEffects} from './core/store/router.effects';
import {CampusEffects} from './core/store/campus/campus.effects';
import {FloorEffects} from './core/store/floor/floor.effects';
import {FloorListComponent} from './components/main-views/floor-list/floor-list.component';
import {RoomListComponent} from './components/main-views/room-list/room-list.component';
import {RoomEffects} from './core/store/room/room.effects';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {PCEffects} from './core/store/pc/pc.effects';
import {PcGridComponent} from './components/main-views/pc-grid/pc-grid.component';
import {LoginComponent} from './components/auth/login/login.component';
import {AuthEffects} from './core/store/auth/auth.effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from './components/loader/loader.component';
import {FeaturesCarouselComponent} from './features-carousel/features-carousel.component';
import {NguCarouselModule} from '@ngu/carousel';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CampusListComponent,
    FloorListComponent,
    RoomListComponent,
    PcGridComponent,
    LoginComponent,
    LoaderComponent,
    FeaturesCarouselComponent,
    SignUpComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgScrollbarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AuthEffects, RouterEffects, CampusEffects, FloorEffects, RoomEffects, PCEffects]),
    StoreRouterConnectingModule.forRoot(),
    FontAwesomeModule,
    NgScrollbarModule,
    NguCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faTimes);
  }
}
