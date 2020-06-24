import {Route} from '@angular/router';

export const IndexRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'index',
    loadChildren: () =>
      import('./index.module').then(m => m.IndexModule)
  },
  // {
  //   path: 'contacts',
  //   loadChildren: () =>
  //     import('./contacts/contacts.module').then(m => m.ContactsModule)
  // },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'new-user',
    loadChildren: () =>
      import('./user/new-user/new-user.module').then(m => m.NewUserModule)
  },
  // {
  //   path: 'new-contact',
  //   loadChildren: () =>
  //     import('./contacts/new-contact/new-contact.module').then(m => m.NewContactModule)
  // },
  {
    path: 'roles',
    loadChildren: () =>
      import('./role/roles/roles.module').then(m => m.RolesModule)
  },
  {
    path: 'new-role',
    loadChildren: () =>
      import('./role/roles/new-role/new-role.module').then(m => m.NewRoleModule)
  },
  {
    path: 'permissions',
    loadChildren: () =>
      import('./permissions/permissions.module').then(m => m.PermissionsModule)
  },
  {
    path: 'new-permission',
    loadChildren: () =>
      import('./permissions/new-permission/new-permission.module').then(m => m.NewPermissionModule)
  },
  {
    path: 'audits',
    loadChildren: () =>
      import('./audits/audits.module').then(m => m.AuditsModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule)
  }
];
