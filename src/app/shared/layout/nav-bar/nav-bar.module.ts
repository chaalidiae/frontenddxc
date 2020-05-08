import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nModule } from '../../lang/i18n/i18n.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavBarComponent } from './nav-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../../assets/i18n/', '/navbar.json');
}


@NgModule({
  declarations: [NavBarComponent],
  imports: [
    BrowserModule,
    NgbModule,
    CommonModule,
    I18nModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: true
    }),
    MatSelectModule,
    MatFormFieldModule,
    RouterModule
  ],exports:[
    NavBarComponent
  ]
})
export class NavBarModule { }
