import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import { CircuitsResponse } from '../_models/index';

@Injectable()
export class CircuitsService {

  constructor(private http: Http) {}

  private preparePath( id: number): string {
    return 'results/circuits/' + id.toString() + '/';
  }

  get_results(id: number): Promise<CircuitsResponse> {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8000/' + this.preparePath(id))
        .toPromise()
        .then((response: Response) => {
          resolve(response.json() as CircuitsResponse);
        }).catch((err: Error | any) => {
        reject(err);
      });
    });
  }
}
