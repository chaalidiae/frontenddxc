import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { SearchContactsComponent } from './search-contacts/search-contacts.component';


const routes: Routes = [
  {
    path: '',component:ContactsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
