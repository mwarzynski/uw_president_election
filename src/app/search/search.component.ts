import {Component, OnInit} from '@angular/core';
import { SearchService } from '../_services/index';
import { SearchResponse } from '../_models/index'

import { AppComponent } from '../app.component';

@Component({
  selector: 'borough-search',
  moduleId: module.id,
  templateUrl: './search.component.html',
  providers: [ SearchService ],
})

export class SearchComponent implements OnInit {

  error: string = '';
  loaded: boolean = false;
  loading: boolean = false;

  model: any = {};
  response: SearchResponse = new SearchResponse;

  constructor(private searchService: SearchService, private appComponent: AppComponent) { }

  onSubmit() {
    this.loading = true;

    if (this.model.query.length < 3) {
      this.error = 'Fraza musi mieć przynajmniej trzy znaki.';
      this.loading = false;
      return;
    }

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

  ngOnInit() {
    this.appComponent.title = 'Wyszukiwanie gmin.';
  }

}

