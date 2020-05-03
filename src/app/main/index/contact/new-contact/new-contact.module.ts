import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewContactRoutingModule } from './new-contact-routing.module';
import { NewContactComponent } from './new-contact.component';
import { FormsModule } from '@angular/forms';
import { I18nModule } from 'src/app/shared/lang/i18n/i18n.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../../../assets/i18n/', '/new-contact.json');
}

@NgModule({
  declarations: [NewContactComponent],
  imports: [
    CommonModule,
    NewContactRoutingModule,
    FormsModule,
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
export class NewContactModule { }
