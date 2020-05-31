import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { FormsModule } from '@angular/forms';
import { I18nModule } from 'src/app/shared/lang/i18n/i18n.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AllPermissionsComponent } from './all-permissions/all-permissions.component';
import { SearchPermissionsComponent } from './all-permissions/search-permissions/search-permissions.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../../../assets/i18n/', '/permissions.json');
}

@NgModule({
  declarations: [PermissionsComponent, AllPermissionsComponent, SearchPermissionsComponent],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
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
export class PermissionsModule { }
