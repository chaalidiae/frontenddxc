import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RolesService } from 'src/app/core/roles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { I18nComponent } from 'src/app/shared/lang/i18n/container/i18n.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromI18n from '../../../../shared/lang/i18n/reducers';
import { UsersService } from 'src/app/core/users.service';
import { Role } from 'src/app/shared/model/role';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent extends I18nComponent{
  id: string;
  mode:string ='add';
  user:any;
  rolesI: any;
  roles: any;
  userRoles:Array<Role>;
  selectedItems: Array<any> = [];
  dropdownSettings:IDropdownSettings={};
  
  constructor(
    private fb: FormBuilder,
    private userservice: UsersService,
    private rolesService: RolesService,
    private router: Router,
    private route: ActivatedRoute,
    readonly store: Store<fromI18n.State>,
    readonly translate: TranslateService
    ) {
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
      this.route.queryParams.subscribe((params) => {
        this.id = params.id;
      });
      this.userservice.getUserById(this.id)
      .subscribe(data => {
        this.user = data;
        this.userRoles=data["roles"];
        this.selectedItems = this.userRoles
                 .map(item => item)
                 .filter((thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i);
      
      console.log("selectedItems efter click on edit: \n"+this.selectedItems);
      }, error => console.log("error : \n"+error));
     }

  
  getPageOfRoles() {
    this.rolesService.getRoles()
      .subscribe(data => {
        this.rolesI = data;
        this.roles=this.rolesI.map(
          item => {return{id:item.id,roleName:item.roleName}})
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
      this.user.roles=this.selectedItems.map(x=>x);
      if(this.mode === 'add')
        this.userservice.saveUser(this.user).subscribe(data => console.log('Done'));
      else
      this.userservice.updateUser(this.user).subscribe(data => console.log('Done'));
    this.router.navigate(['/user']);
  }
  
  

}
