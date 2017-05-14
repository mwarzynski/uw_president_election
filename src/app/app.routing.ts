import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';
import { ElectionsComponent } from './elections/index';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';

const appRoutes: Routes = [
  // Search
  { path: 'borough/search', component: SearchComponent },

  // Edit
  { path: 'circuit/:id', component: EditComponent, data: {type: 'borough'}, canActivate: [AuthGuard] },

  // Browse data
  { path: 'login', component: LoginComponent},
  { path: '', component: ElectionsComponent, data: {type: 'country'}},
  { path: 'voivodeship/:id', component: ElectionsComponent, data: {type: 'voivodeship'}},
  { path: 'precinct/:id', component: ElectionsComponent, data: {type: 'precinct'}},
  { path: 'borough/:id', component: ElectionsComponent, data: {type: 'borough'}},

  // If 404, redirect to main page
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
