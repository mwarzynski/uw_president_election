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

  showForm: boolean = true;

  error: string = '';
  loading: boolean = false;
  submitted: boolean = false;

  response: EditCircuitResponse = new EditCircuitResponse();

  constructor(route: ActivatedRoute, private appComponent: AppComponent, private editService: EditService) {
    route.paramMap.subscribe(
      params => this.id = parseInt(params.get('id'), 10)
    );
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    this.editService.circuit_save(this.id, this.response)
      .then((ok: boolean) => {
        this.error = '';
        this.loading = false;
      })
      .catch((err: Error | any) => {
        if (err === 'unauthorized') {
          this.error = 'Niezalogowani użytkownicy nie mogą zmieniać danych.';
        } else {
          this.error = err.message;
        }
        this.loading = false;
      });
  }

  ngOnInit() {
    this.editService.circuit_get(this.id)
      .then((response: EditCircuitResponse) => {
        this.appComponent.title = response.name;
        this.response = response;
      }).catch((err: Error | any) => {
        if (err === 'unauthorized') {
          this.error = 'Zaloguj się aby móc edytować obwody.';
        } else {
          console.error(err);
        }
    });
  }
}
