import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoleRoutingModule } from './new-role-routing.module';
import { NewRoleComponent } from './new-role.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewRoleComponent],
  imports: [
    CommonModule,
    NewRoleRoutingModule,
    FormsModule
  ]
})
export class NewRoleModule { }
