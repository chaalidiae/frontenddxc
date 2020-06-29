import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserConnectedComponent } from './user-connected.component';


const routes: Routes = [
  {
    path: '',component:UserConnectedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserConnectedRoutingModule { }
