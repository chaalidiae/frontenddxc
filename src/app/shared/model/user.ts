import { Role } from './role';

export class User {
  id: any = null;
  username: string='';
  password: string='';
  roles: Array<Role> = null;
}
