import {Injectable}              from '@angular/core';
import { Http, Response }          from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AuthenticationService } from './authentication.service';
import { EditCircuitResponse } from '../_models/index';

@Injectable()
export class EditService {

  constructor(private http: Http, private authenticationService: AuthenticationService) {}

  circuit_save(circuit_id: number, data: EditCircuitResponse): Promise<boolean> {
    if (!this.authenticationService.isLoggedIn) {
      return new Promise((resolve, reject) => {
        reject('unauthorized');
      });
    }

    return new Promise((resolve, reject) => {
      this.http.post(
            'http://localhost:8000/edit/circuit/' + circuit_id.toString() + '/',
            data,
            { headers: this.authenticationService.headers()})
        .toPromise()
        .then((response: Response) => {
          resolve(true);
        })
        .catch((response: Response | any) => {
          if (!(response instanceof Response)) {
            reject(response);
            return;
          }
          switch (response.status) {
            case 204:
              resolve(true);
              return;
            case 400:
              reject({ found: true, message: response.json()['message']});
              return;
            case 404:
              reject({ found: false, message: response.json()['message']});
              return;
            case 500:
              reject({ found: false, message: 'Ups... Coś poszło nie tak.'});
              return;
          }
        });
    });
  }

  circuit_get(circuit_id: number): Promise<EditCircuitResponse> {
    if (!this.authenticationService.isLoggedIn) {
      return new Promise((resolve, reject) => {
        reject('unauthorized');
      });
    }

    return new Promise((resolve, reject) => {
      this.http.get(
          'http://localhost:8000/edit/circuit/' + circuit_id.toString() + '/',
          { headers: this.authenticationService.headers() })
        .toPromise()
        .then((response: Response) => {
          resolve(response.json() as EditCircuitResponse);
        })
        .catch((err: Error | any) => {
          reject(err);
      });
    });
  }

}
