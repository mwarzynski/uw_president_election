import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditService } from '../_services/index';
import { EditCircuitResponse } from '../_models/index';
import { AppComponent } from '../app.component';

@Component({
  selector: 'edit',
  moduleId: module.id,
  templateUrl: './edit.component.html',
  providers: [ EditService ],
})

export class EditComponent implements OnInit {

  id: number;

  error: string = '';
  loading: boolean = false;
  submitted: boolean = false;

  response: EditCircuitResponse = null;

  constructor(route: ActivatedRoute, private appComponent: AppComponent, private editService: EditService) {
    route.paramMap.subscribe(
      params => this.id = parseInt(params.get('id'), 10)
    );
  }

  onSubmit() {
    this.submitted = false;
    this.loading = true;

    this.editService.circuit_save(this.id, this.response)
      .then((ok: boolean) => {
        this.error = '';
        this.submitted = true;
        this.loading = false;
      })
      .catch((err: string) => {
        if (err === 'Cannot set negative votes.') {
          this.error = 'Kandydat nie może otrzymać ujemnej liczby głosów.';
        } else if (err === 'Number of valid votes is higher than all votes.') {
          this.error = 'Liczba ważnych kart nie może być wyższa niż liczba wszystkich kart.';
        } else {
          this.error = err;
        }
        this.loading = false;
      });
  }

  ngOnInit() {
    this.editService.circuit_get(this.id)
      .then((response: EditCircuitResponse) => {
        this.appComponent.title = response.name;
        this.response = response;
      }).catch((err: string) => {
        this.error = err;
    });
  }
}
