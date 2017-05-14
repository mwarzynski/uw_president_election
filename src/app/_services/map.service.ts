import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import {VoivodeshipsResponse} from '../_models/data';

@Injectable()
export class MapService {

  constructor(private http: Http) {}

  get_voivodeships(): Promise<VoivodeshipsResponse> {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8000/voivodeships/')
        .toPromise()
        .then((response: Response) => {
          resolve(response.json() as VoivodeshipsResponse);
        }).catch((err: Error | any) => {
        reject(err);
      });
    });
  }
}
