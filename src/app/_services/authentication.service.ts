import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: Http) {
    let user = JSON.parse(localStorage.getItem('user'));
    this.token = user && user.token;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:8000/api/authenticate', JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        let token = response.json() && response.json().token;

        if (token) {
          this.token = token;
          localStorage.setItem('user', JSON.stringify({ username: username, token: token }));
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('user');
  }
}
