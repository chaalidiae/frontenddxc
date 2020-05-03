import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPermissionRoutingModule } from './new-permission-routing.module';
import { NewPermissionComponent } from './new-permission.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewPermissionComponent],
  imports: [
    CommonModule,
    NewPermissionRoutingModule,
    FormsModule
  ]
})
export class NewPermissionModule { }
