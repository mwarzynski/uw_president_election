import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import { SearchResponse } from '../_models/index';

@Injectable()
export class SearchService {

  constructor(private http: Http) {}

  search(query: string): Promise<SearchResponse> {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8000/search/borough', { params: {'query': query }})
        .toPromise()
        .then((response: Response) => {
          resolve(response.json() as SearchResponse);
        }).catch((err: Error | any) => {
        reject(err);
      });
    });
  }
}
