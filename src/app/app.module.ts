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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';


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
import { CommitsauthorComponent } from './components/commitsauthor/commitsauthor.component';
import { SearchcommitsComponent } from './components/searchcommits/searchcommits.component';


//registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    LoginComponent,
    RepositoriesComponent,
    FilterPipe,
    AppComponent,
    CommitsmetricsComponent,
    ReposComponent,
    BranchesComponent,
    CommitsauthorComponent,
    SearchcommitsComponent
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
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'en-US' },
    DecimalPipe,
    MatDatepickerModule,
    MatNativeDateModule
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }