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

/*Angular project*/
import { AppComponent } from './components/app/app.component';
import { LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { FilterPipe } from './pipes/filter.pipe';
import { LoginComponent } from './components/login/login.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { CommitsmetricsComponent } from './components/commitsmetrics/commitsmetrics.component';
import { ReposComponent } from './components/repos/repos.component';
import { BranchesComponent } from './components/branches/branches.component';
import { CommitsauthorComponent } from './components/commitsauthor/commitsauthor.component';
import { SearchcommitsComponent } from './components/searchcommits/searchcommits.component';
import { CommitsauthorfechasComponent } from './components/commitsauthorfechas/commitsauthorfechas.component';
import { UseropsComponent } from './components/userops/userops.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { RepositoryinfoComponent } from './components/repositoryinfo/repositoryinfo.component';
import { RepousersComponent } from './components/repousers/repousers.component';
import { UsersgithubComponent } from './components/usersgithub/usersgithub.component';
import { RepoopsComponent } from './components/repoops/repoops.component';
import { CommitsrepoComponent } from './components/commitsrepo/commitsrepo.component';
import { IssuesrepoComponent } from './components/issuesrepo/issuesrepo.component';
import { ProductmetricsrepoComponent } from './components/productmetricsrepo/productmetricsrepo.component';
import { TestmetricsrepoComponent } from './components/testmetricsrepo/testmetricsrepo.component';

//Externals
import { NgxSpinnerModule } from 'ngx-spinner';
import { InterceptorspinnerService } from './services/interceptorspinner.service';
import { CreatetokenComponent } from './components/createtoken/createtoken.component';
import { UpdatetokenComponent } from './components/updatetoken/updatetoken.component';
import { RecoverpassComponent } from './components/recoverpass/recoverpass.component';
import { UsergithubopsComponent } from './components/usergithubops/usergithubops.component';

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
    SearchcommitsComponent,
    CommitsauthorfechasComponent,
    UseropsComponent,
    AboutmeComponent,
    UpdateuserComponent,
    CreateuserComponent,
    RepositoryinfoComponent,
    RepousersComponent,
    UsersgithubComponent,
    RepoopsComponent,
    CommitsrepoComponent,
    IssuesrepoComponent,
    ProductmetricsrepoComponent,
    TestmetricsrepoComponent,
    CreatetokenComponent,
    UpdatetokenComponent,
    RecoverpassComponent,
    UsergithubopsComponent
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
    MatIconModule,
    NgxSpinnerModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorspinnerService, multi: true },
    { provide: LOCALE_ID, useValue: 'en-US' },
    DecimalPipe,
    MatDatepickerModule,
    MatNativeDateModule
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }