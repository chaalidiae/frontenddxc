import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import {RouterModule} from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { I18nModule } from './lang/i18n/i18n.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavBarModule } from './layout/nav-bar/nav-bar.module';
import { FooterModule } from './layout/footer/footer.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '/footer.json');
}


@NgModule({
    declarations: [],
    exports: [
    ],
  imports: [
    NavBarModule,
    FooterModule,
    I18nModule,
    CommonModule,
    RouterModule,
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
export class SharedModule { }
