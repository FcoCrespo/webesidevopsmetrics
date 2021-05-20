import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DecimalPipe} from '@angular/common';

/*Angular material*/
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/*Angular routing*/
import { AppRoutingModule } from './app-routing.module';

/*Angular interceptor*/
import { JwtInterceptor, ErrorInterceptor } from './interceptors';

/*Angular component*/
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';


/*Angular local ES*/
import { LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { FilterPipe } from './pipes/filter.pipe';
import { CommitsmetricsComponent } from './components/commitsmetrics/commitsmetrics.component';
import { ReposComponent } from './components/repos/repos.component';
import { BranchesComponent } from './components/branches/branches.component';


registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    LoginComponent,
    RepositoriesComponent,
    FilterPipe,
    AppComponent,
    CommitsmetricsComponent,
    ReposComponent,
    BranchesComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' },
    DecimalPipe
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }