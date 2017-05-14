import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';
import { ElectionsComponent } from './elections/index';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: ElectionsComponent, data: {type: 'country'}},
  { path: 'voivodeship/:id', component: ElectionsComponent, data: {type: 'voivodeship'}},
  { path: 'precinct/:id', component: ElectionsComponent, data: {type: 'precinct'}},
  { path: 'borough/:id', component: ElectionsComponent, data: {type: 'borough'}},

  // { path: '', component: ElectionsComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  // { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
