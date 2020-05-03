import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentification.service';
import {Audit} from '../shared/model/audit';

@Injectable()
export class AuditsService {
  private host = 'http://localhost:8080/audits';

constructor(private http: HttpClient, private authService: AuthenticationService) {
  }
getAudits() {
    if (this.authService.jwtToken == null) { this.authService.LoadToken(); }
    return this.http.get
    (this.host,{headers: new HttpHeaders({Authorization: this.authService.jwtToken})});
  }

}
