import { Component, OnInit } from '@angular/core';
import { CircuitsService, AuthenticationService } from '../_services/index';
import { CircuitsResponse } from '../_models/index';
import { ElectionsComponent } from './elections.component';

@Component({
  selector: 'circuits',
  moduleId: module.id,
  templateUrl: './circuit.component.html',
  providers: [ CircuitsService ]
})

export class CircuitComponent implements OnInit {

  isLogged: boolean = false;

  error: string = '';

  response: CircuitsResponse =  new CircuitsResponse();

  constructor(
    private elections: ElectionsComponent,
    private circuitsService: CircuitsService,
    private authenitactionService: AuthenticationService) {}

  saveCircuit(response: CircuitsResponse) {
    this.response = response;
    localStorage.setItem('circuits', JSON.stringify(response));
  }


  ngOnInit() {
    this.response = JSON.parse(localStorage.getItem('circuits')) as CircuitsResponse;
    this.isLogged = this.authenitactionService.isLoggedIn;

    this.circuitsService.get_results(this.elections.viewID)
      .then((response: CircuitsResponse) => {
        this.saveCircuit(response);
        this.error = '';
      }).catch((err: {message: string}) => {
        this.error = err.message;
    });
  }
}
