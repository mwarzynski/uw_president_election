import { Component, OnInit } from '@angular/core';
import { PagesService } from '../_services/index';
import { PagesResponse } from '../_models/index';
import { ElectionsComponent } from './elections.component';

@Component({
  selector: 'pages',
  moduleId: module.id,
  templateUrl: './pages.component.html',
  providers: [ PagesService ],
})

export class PagesComponent implements OnInit {

  response: PagesResponse = JSON.parse(localStorage.getItem('pages')) as PagesResponse;

  constructor(private elections: ElectionsComponent, private pagesService: PagesService) { }

  savePages(response: PagesResponse) {
    this.response = response;
    localStorage.setItem('pages', JSON.stringify(response));
  }

  ngOnInit() {
    this.pagesService.get_pages(this.elections.viewType, this.elections.viewID)
      .then((response: PagesResponse) => {
        this.savePages(response);
      }).catch((err: Error | any) => {
      console.log(err);
    });
  }
}

