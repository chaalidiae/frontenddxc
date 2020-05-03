import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { I18nComponent } from './shared/lang/i18n/container/i18n.component';
import * as fromI18n from './shared/lang/i18n/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends I18nComponent {
  constructor(
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
  ) {
    super(store, translate);
  }
}
