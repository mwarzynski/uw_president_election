import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../_services/index';
import { ResultsResponse } from '../_models/index';
import { ElectionsComponent } from './elections.component';

@Component({
  selector: 'results',
  moduleId: module.id,
  templateUrl: './results.component.html',
  providers: [ ResultsService ],
})

export class ResultsComponent implements OnInit {

  response: ResultsResponse = JSON.parse(localStorage.getItem('results')) as ResultsResponse;

  colorClass(i: number): string {
    if (i === 0) {
      return 'red';
    } else if (i === 1) {
      return 'blue';
    }
    return '';
  }

  constructor(private elections: ElectionsComponent, private resultsService: ResultsService) { }

  saveResponse(response: ResultsResponse) {
    localStorage.setItem('results', JSON.stringify(response));
    this.response = response;
  }

  ngOnInit() {
    this.resultsService.get_results(this.elections.viewType, this.elections.viewID)
      .then((response: ResultsResponse) => {
        this.saveResponse(response);
      }).catch((err: Error | any) => {
      console.log(err);
    });
  }
}
