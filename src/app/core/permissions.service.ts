import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentification.service';
import { Permission } from '../shared/model/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private host = 'http://localhost:8080/permissions';
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getPermissions() {
    if (this.authService.jwtToken == null) { this.authService.LoadToken();}
    return this.http.get
    (this.host,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }
  getPageOfPermissions(page:number,size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    ("http://localhost:8080/getPageOfPermissions?page="+page+"&size="+size,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }
  searchForPermissions(keyword:string, column:string, page:number, size:number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    ("http://localhost:8080/searchForPermissions?page="+page+"&size="+size+"&keyword="+keyword+"&column="+column,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }
  getPermissionById(id) {
    return this.http.get(this.host + '/' + id, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})} );
  }
  updatePermission(permission: Permission) {
    return this.http.put(this.host + '/' + permission.id , permission, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }
  savePermission(permission) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.post(this.host , permission, {headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
    }
}
