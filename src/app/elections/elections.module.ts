import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ElectionsComponent }       from './elections.component';
import { ResultsComponent } from './results.component';
import { PagesComponent } from './pages.component';
import { MapComponent } from './map.component';
import { CircuitComponent } from './circuit.component';

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule ],
  declarations: [ ElectionsComponent, ResultsComponent, MapComponent, PagesComponent, CircuitComponent ]
})
export class ElectionsModule { }
