import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RolesService } from 'src/app/core/roles.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent extends I18nComponent{
  
  user:any;
  roles: any;
  selectedItems = [];
  dropdownSettings:IDropdownSettings={};
  dropdownList = [];
  constructor(
    private rolesService: RolesService,
    private router: Router,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService) {
      super(store, translate);
      this.user= new User();
      this.getPageOfRoles();
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'roleName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
     }

  
  getPageOfRoles() {
    this.rolesService.getRoles()
      .subscribe(data => {
        this.roles = data;
      }, error => {
        this.router.navigateByUrl('/**');
      });
  }
  
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnSubmit(){

  }

}
