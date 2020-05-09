import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './main/index/index.component';
import { NoPageComponent } from './main/no-page/no-page.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.router';
import {IndexModule} from './main/index/index.module';
import {SharedModule} from './shared/shared.module';
import {AuthenticationService} from './core/authentification.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ContactsService} from './core/contacts.service';
import {NewContactComponent} from './main/index/contact/new-contact/new-contact.component';
import {UsersService} from './core/users.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { AuditsService } from './core/audit.service';

import { HttpClient } from '@angular/common/http';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nModule } from './shared/lang/i18n/i18n.module';
import { metaReducers, ROOT_REDUCERS } from './shared/lang/reducers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginModule } from './main/index/login/login.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '/navbar.json');
}


@NgModule({
  declarations: [
    AppComponent,
    //IndexComponent,
    NoPageComponent
  ],
  imports: [
    LoginModule,
    IndexModule,
    BrowserModule,
    AppRoutingModule,
    IndexModule,
    RouterModule.forRoot(routes),
    SharedModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientModule,
    I18nModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store App'
    }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: true
    }),

    NgbModule,
    FontAwesomeModule
  ],
  providers: [AuthenticationService, 
    ContactsService, 
    NewContactComponent, 
    UsersService,
    FooterComponent, 
    AuditsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
