import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Credentials } from '../_models/authentication';

@Injectable()
export class AuthenticationService {

  public isLoggedIn: boolean = false;

  public username: string;
  public token: string;

  constructor(private http: Http) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.token = user.token;
      this.username = user.username;
      this.isLoggedIn = true;
    }
  }

  getUsername() {
    console.log(this.username);
  }

  login(username: string, password: string): Promise<boolean> {
    let credentials: Credentials = { username: username, password: password };
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8000/login/', credentials)
        .toPromise()
        .then((response: Response) => {
          let user = response.json();

          if (user) {
            this.token = user.token;
            this.username = user.username;
            this.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify({ username: this.username, token: this.token }));
            resolve(true);
          }

          reject('unauthorized');
        })
        .catch((err: Error | any) => {
          reject(err);
        });
    });
  }

  logout(): void {
    this.username = null;
    this.token = null;
    localStorage.removeItem('user');
  }

  headers(): Headers {
    let h: Headers = new Headers();
    h.set('Authorization', 'Token ' + this.token);
    return h;
  }
}
