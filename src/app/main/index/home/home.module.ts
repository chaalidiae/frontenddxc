import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nModule } from 'src/app/shared/lang/i18n/i18n.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../../assets/i18n/', '/home.json');
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    RouterModule,
    I18nModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: true
    })
  ]
})
export class HomeModule { }
