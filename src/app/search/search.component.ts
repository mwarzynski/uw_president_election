import { Component } from '@angular/core';
import { SearchService } from '../_services/index';
import { SearchResponse } from '../_models/index';

@Component({
  selector: 'borough-search',
  moduleId: module.id,
  templateUrl: './search.component.html',
  providers: [ SearchService ],
})

export class SearchComponent {

  error: string = '';
  loaded: boolean = false;
  loading: boolean = false;

  model: any = {};
  response: SearchResponse = new SearchResponse;

  constructor(private searchService: SearchService) { }

  onSubmit() {
    this.loading = true;
    this.searchService.search(this.model.query)
      .then((response: SearchResponse) => {
        this.loading = false;
        this.error = '';
        this.loaded = true;
        this.response = response;
      }).catch((err: Error | any) => {
        console.error(err);
        this.loading = false;
        this.error = 'Nie udało się pobrać wyników.';
    });
  }

}

