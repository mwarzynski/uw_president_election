import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EditComponent }       from './edit.component';

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule ],
  declarations: [ EditComponent ]
})
export class EditModule { }
