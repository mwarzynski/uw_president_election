import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './_guards/index';
import { AuthenticationService } from './_services/index';
import { LoginComponent } from './login/index';
import { ElectionsModule } from './elections/index';
import { SearchModule } from './search/search.module';
import { EditModule } from './edit/edit.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ElectionsModule,
    SearchModule,
    EditModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
