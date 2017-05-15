import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

import { AuthenticationService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.appComponent.title = 'Strona logowania';
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err: string) => {
        this.error = err;
        this.loading = false;
      });
  }
}
