import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import { PagesResponse, Views, viewToString } from '../_models/index';

@Injectable()
export class PagesService {

  constructor(private http: Http) {}

  private preparePath(view: Views, id: number): string {
    if (view !== Views.COUNTRY) {
      return 'pages/' + viewToString(view) + '/' + id.toString() + '/';
    } else {
      return 'pages/';
    }
  }

  get_pages(view: Views, id: number): Promise<PagesResponse> {
    if (view !== Views.VOIVODESHIP && view !== Views.PRECINCT) {
      return new Promise((resolve, reject) => {
        reject('Invalid view.');
      });
    }

    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8000/' + this.preparePath(view, id))
        .toPromise()
        .then((response: Response) => {
          resolve(response.json() as PagesResponse);
        }).catch((err: Error | any) => {
        reject(err);
      });
    });
  }
}
