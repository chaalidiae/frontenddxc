import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../login/shared/authentification.service';
import { Role } from '../../../../shared/model/role';
import {GlobalConstants} from "../../../../shared/GlobalConstants";

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getRoles() {
    if (this.authService.jwtToken == null) { this.authService.LoadToken();}
    return this.http.get
    (GlobalConstants.host + '/roles');
  }
  getPageOfRoles(page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/getPageOfRoles?page=' + page + '&size=' + size);
  }
  searchForRoles(keyword:string, column:string, page:number, size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/searchForRoles?page=' + page + '&size=' + size + '&keyword=' + keyword + '&column=' + column);
  }
  getRoleById(id) {
    return this.http.get(GlobalConstants.host + '/roles/' + id);
  }
  getRoleByRoleName(roleName) {
    return this.http.get(GlobalConstants.host + '/getRoleByroleName?roleName=' + roleName);
  }
  saveRole(role) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.post(GlobalConstants.host + '/roles' , role);
    }
  updateRole(role: Role) {
    return this.http.put(GlobalConstants.host + '/roles/' + role.id , role);
  }
  deleteRole(id) {
    return this.http.delete(GlobalConstants.host + '/roles/' + id);
  }
}
