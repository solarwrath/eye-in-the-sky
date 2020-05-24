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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormEncodedUriPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgScrollbarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
