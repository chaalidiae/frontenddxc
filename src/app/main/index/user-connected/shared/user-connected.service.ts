import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../login/shared/authentification.service';
import {GlobalConstants} from '../../../../shared/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class UserConnectedService {
  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  
  getAccount() {
    return this.http.get(GlobalConstants.host + '/profile/');
  }
  
}
