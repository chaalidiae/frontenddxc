import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder } from '@angular/forms';
import { PermissionsService } from 'src/app/main/index/permission/shared/permissions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Role } from 'src/app/shared/model/role';
import { RolesService } from 'src/app/main/index/role/shared/roles.service';

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css']
})
export class NewRoleComponent extends I18nComponent{

  id: string;
  mode:string ='add';
  role:any;
  permissionI: any;
  permissions: any;
  rolePermissions:Array<Role>;
  selectedItems: Array<any> = [];
  dropdownSettings:IDropdownSettings={};

  constructor(
    private fb: FormBuilder,
    private roleservice: RolesService,
    private permissionsService: PermissionsService,
    private router: Router,
    private route: ActivatedRoute,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
  ) {
    super(store, translate);
    this.role = new Role();
    this.getPageOfPermissions();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'permissionName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
    });

    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
    });
    this.roleservice.getRoleById(this.id)
    .subscribe(data => {
      this.role = data;
      this.rolePermissions=data["permissions"];
      this.selectedItems = this.rolePermissions;

    console.log("selectedItems efter click on edit: \n"+this.selectedItems);
    }, error => console.log("error : \n"+error));

   }

   getPageOfPermissions() {
    this.permissionsService.getPermissions()
      .subscribe(data => {
        this.permissionI = data;
        this.permissions=this.permissionI.map(
          item => {return{id:item.id,permissionName:item.permissionName}})
        .filter((value, index, self) => self.indexOf(value) === index);
      }, error => {
        this.router.navigateByUrl('/**');
      });
  }

  onItemSelect(item: any) {
    console.log("item : \n"+item);
    console.log("selectedItems : \n"+this.selectedItems);
  }

  OnSubmit(){
    this.role.permissions=this.selectedItems.map(x=>x);
    if(this.mode === 'add')
      this.roleservice.saveRole(this.role).subscribe(data => console.log('Done'));
    else
    this.roleservice.updateRole(this.role).subscribe(data => console.log('Done'));
  this.router.navigate(['/roles']);
}



}
