import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { IndexComponent } from '../index.component';


const routes: Routes = [
  {
    path: '',component:LoginComponent
  },
  {
    path: 'index',component:IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
