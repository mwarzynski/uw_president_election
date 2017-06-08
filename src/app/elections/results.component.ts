import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../_services/index';
import { ResultsResponse, Views } from '../_models/index';
import { ElectionsComponent } from './elections.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'results',
  moduleId: module.id,
  templateUrl: './results.component.html',
  providers: [ ResultsService ],
})

export class ResultsComponent implements OnInit {

  error: string = '';

  response: ResultsResponse = JSON.parse(localStorage.getItem('results')) as ResultsResponse;


  colorClass(i: number): string {
    if (i === 0) {
      return 'red';
    } else if (i === 1) {
      return 'blue';
    }
    return '';
  }

  constructor(
    private appComponent: AppComponent,
    private elections: ElectionsComponent,
    private resultsService: ResultsService) { }

  saveResponse(response: ResultsResponse) {
    localStorage.setItem('results', JSON.stringify(response));
    this.response = response;
    this.setTitle();
  }

  setTitle() {
    if (this.elections.viewType !== Views.COUNTRY) {
      this.appComponent.title = this.response.name;
    } else {
      this.appComponent.title = 'Wybory prezydenckie 2000';
    }
  }

  ngOnInit() {
    this.resultsService.get_results(this.elections.viewType, this.elections.viewID)
      .then((response: ResultsResponse) => {
        this.saveResponse(response);
        this.error = '';
      }).catch((err: {message: string}) => {
        this.error = err.message;
    });
  }
}
