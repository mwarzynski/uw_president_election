import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule ],
  declarations: [ SearchComponent ]
})
export class SearchModule { }
