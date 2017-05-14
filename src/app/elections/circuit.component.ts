import { Component, OnInit } from '@angular/core';
import { CircuitsService } from '../_services/index';
import { CircuitsResponse } from '../_models/index';
import { ElectionsComponent } from './elections.component';

@Component({
  selector: 'circuits',
  moduleId: module.id,
  templateUrl: './circuit.component.html',
  providers: [ CircuitsService ],
})

export class CircuitComponent implements OnInit {

  response: CircuitsResponse = new CircuitsResponse();

  constructor(private elections: ElectionsComponent, private circuitsService: CircuitsService) { }

  ngOnInit() {
    this.circuitsService.get_results(this.elections.viewID)
      .then((response: CircuitsResponse) => {
        this.response = response;
      }).catch((err: Error | any) => {
      console.log(err);
    });
  }
}
