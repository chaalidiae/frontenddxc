import { Permission } from './permission';

export class Role {
  id: any = null;
  roleName: string='';
  permissions: Array<Permission>=null;

  constructor(id: any, roleName: string, permissions: Array<Permission>) {
    this.id = id;
    this.roleName = roleName;
    this.permissions = permissions;
}

}
