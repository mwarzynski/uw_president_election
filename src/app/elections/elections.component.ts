import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Views, parseView } from '../_models/index';

@Component({
  moduleId: module.id,
  template: `
      <results></results>
      <maps *ngIf="showMap"></maps>
      <pages *ngIf="showPages"></pages>
      <circuits *ngIf="showCircuits"></circuits>
  `,
})

export class ElectionsComponent {

  viewType: Views;
  viewID: number;

  showMap: boolean = false;
  showPages: boolean = false;
  showCircuits: boolean = false;

  constructor(route: ActivatedRoute) {
    route.data.subscribe(
      data => this.viewType = parseView(data['type'])
    );
    route.paramMap.subscribe(
      params => this.viewID = parseInt(params.get('id'), 10)
    );
    this.showMap = this.viewType === Views.COUNTRY;
    this.showPages = this.viewType === Views.VOIVODESHIP || this.viewType === Views.PRECINCT;
    this.showCircuits = this.viewType === Views.BOROUGH;
  }

}
