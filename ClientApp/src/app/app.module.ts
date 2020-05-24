import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {FormEncodedUriPipe} from './form-encoded-uri.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
