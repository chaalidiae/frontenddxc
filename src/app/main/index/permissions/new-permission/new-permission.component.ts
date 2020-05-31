import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { PermissionsService } from 'src/app/main/index/permissions/shared/permissions.service';
import { Permission } from 'src/app/shared/model/permission';

@Component({
  selector: 'app-new-permission',
  templateUrl: './new-permission.component.html',
  styleUrls: ['./new-permission.component.css']
})
export class NewPermissionComponent extends I18nComponent{
  permission: any;
  id: string;
  mode = 1;
  constructor(
    private permissionsservice: PermissionsService,
    private router: Router,
    private route: ActivatedRoute,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
    ) {
      super(store, translate);
      this.permission = new Permission();
      this.route.queryParams.subscribe((params) => {
      this.id = params.id;
      if (typeof this.id === 'undefined') {
        this.mode = 1;
      } else {
        this.mode = 0;
      }
    });
      this.permissionsservice.getPermissionById(this.id)
      .subscribe(data => {
        this.permission = data;
      }, error => console.log(error));

  }
  OnSubmit() {
    if (this.mode === 1) {
      this.permissionsservice.savePermission(this.permission).subscribe(data => console.log('permission saved successfully'));
      this.router.navigate(['/permissions']);
    } else {
      this.permissionsservice.updatePermission(this.permission).subscribe(data => console.log('permission updated successfully'));
      this.router.navigate(['/permissions']);
    }
  }
}
