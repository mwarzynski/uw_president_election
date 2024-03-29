import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import { ResultsResponse, Views, viewToString } from '../_models/index';

@Injectable()
export class ResultsService {

  constructor(private http: Http) {}

  private preparePath(view: Views, id: number): string {
    if (view !== Views.COUNTRY) {
      return 'results/' + viewToString(view) + '/' + id.toString() + '/';
    } else {
      return 'results/';
    }
  }

  get_results(view: Views, id: number): Promise<ResultsResponse> {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8000/' + this.preparePath(view, id))
        .toPromise()
        .then((response: Response) => {
          resolve(response.json() as ResultsResponse);
        }).catch((response: Response) => {
          switch (response.status) {
            case 0: // timeout
              reject({message: 'napotkano problemy podczas próby nawiązania połączenia'});
              return;
            case 404:
              reject({message: 'nie znaleziono danych'});
              return;
            case 500:
              reject({message: 'wystąpił niespodziewany problem'});
              return;
          }
          reject(response);
        });
    });
  }
}
