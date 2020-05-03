import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentification.service';

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
}
