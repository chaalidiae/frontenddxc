import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentification.service';
import { Role } from '../shared/model/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private host = 'http://localhost:8080/roles';
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getRoles() {
    if (this.authService.jwtToken == null) { this.authService.LoadToken();}
    return this.http.get
    (this.host,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }
  getPageOfRoles(page:number,size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    ("http://localhost:8080/getPageOfRoles?page="+page+"&size="+size,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }
  searchForRoles(keyword:string, column:string, page:number, size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    ("http://localhost:8080/searchForRoles?page="+page+"&size="+size+"&keyword="+keyword+"&column="+column,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }
  getRoleById(id) {
    return this.http.get(this.host + '/' + id, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})} );
  }
  getRoleByRoleName(roleName) {
    return this.http.get('http://localhost:8080/getRoleByroleName?roleName=' + roleName, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})} );
  }
  saveRole(role) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.post(this.host , role, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
    }
  updateRole(role: Role) {
    return this.http.put(this.host + '/' + role.id , role, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }
}
