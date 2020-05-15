import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../login/shared/authentification.service';
import { Permission } from '../../../../shared/model/permission';
import {GlobalConstants} from "../../../../shared/GlobalConstants";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getPermissions() {
    if (this.authService.jwtToken == null) { this.authService.LoadToken();}
    return this.http.get
    (GlobalConstants.host + '/permissions');
  }
  getPageOfPermissions(page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/getPageOfPermissions?page=' + page + '&size=' + size);
  }
  searchForPermissions(keyword: string, column: string, page: number, size: number) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (GlobalConstants.host + '/searchForPermissions?page=' + page + '&size=' + size + '&keyword=' + keyword + '&column=' + column);
  }
  getPermissionById(id) {
    return this.http.get(GlobalConstants.host + '/permissions/' + id);
  }
  updatePermission(permission: Permission) {
    return this.http.put(GlobalConstants.host + '/permissions/' + permission.id , permission);
  }
  savePermission(permission) {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.post(GlobalConstants.host + '/permissions' , permission);
    }
}
