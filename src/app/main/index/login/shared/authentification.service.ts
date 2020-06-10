import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from "../../../../shared/GlobalConstants";

@Injectable()
export class AuthenticationService {
  public jwtToken = null;
  private roles: Array<any>;
  constructor(private http: HttpClient) {
  }

  /**
   * Cette fonction permet d'envoyer une requette d'authentification afin d'obtenir le Toke JWT.
   * @param user
   */
  login(user) {
    return this.http.post(GlobalConstants.host + '/authenticate', user, {observe : 'response'});
  }

  /**
   * Enregistrer le Token obtenu dans le local Storage.
   * @param jwt
   */
  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
  }

  /**
   * Récupérer le token a partir du local storage.
   * @constructor
   */
  LoadToken() {
    this.jwtToken = localStorage.getItem('token');
    return localStorage.getItem('token');
  }

  /**
   * Faire le logout.
   */
  logout(){
    this.jwtToken = null;
    localStorage.removeItem('token');
  }
}
