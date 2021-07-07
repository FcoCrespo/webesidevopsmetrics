  
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositoriesComponent } from './components/repositories/repositories.component';
import { ReposComponent } from './components/repos/repos.component';
import { BranchesComponent } from './components/branches/branches.component';
import { CommitsmetricsComponent } from './components/commitsmetrics/commitsmetrics.component';
import { CommitsauthorComponent } from './components/commitsauthor/commitsauthor.component';
import { CommitsauthorfechasComponent } from './components/commitsauthorfechas/commitsauthorfechas.component';
import { UseropsComponent } from './components/userops/userops.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { CreatetokenComponent } from './components/createtoken/createtoken.component';
import { UpdatetokenComponent } from './components/updatetoken/updatetoken.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { RepositoryinfoComponent } from './components/repositoryinfo/repositoryinfo.component';
import { RepousersComponent } from './components/repousers/repousers.component';
import { UsersgithubComponent } from './components/usersgithub/usersgithub.component';
import { RepoopsComponent } from './components/repoops/repoops.component';
import { CommitsrepoComponent } from './components/commitsrepo/commitsrepo.component';
import { IssuesrepoComponent } from './components/issuesrepo/issuesrepo.component';
import { ProductmetricsrepoComponent } from './components/productmetricsrepo/productmetricsrepo.component';
import { TestmetricsrepoComponent } from './components/testmetricsrepo/testmetricsrepo.component';
import { LoginComponent } from './components/login/login.component';
import { RecoverpassComponent } from './components/recoverpass/recoverpass.component';
import { UsergithubopsComponent } from './components/usergithubops/usergithubops.component';

import { AuthGuard } from './guards';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recoverpass', component: RecoverpassComponent },
  //{ path: 'repositories', component: RepositoriesComponent, canActivate: [AuthGuard] },
  { path: 'repos', component: ReposComponent, canActivate: [AuthGuard] },
  { path: 'branches', component: BranchesComponent, canActivate: [AuthGuard] },
  { path: 'commitsmetrics', component: CommitsmetricsComponent, canActivate: [AuthGuard] },
  { path: 'commitsauthor', component: CommitsauthorComponent, canActivate: [AuthGuard] },
  { path: 'commitsauthorfechas', component: CommitsauthorfechasComponent, canActivate: [AuthGuard] },
  { path: 'userops', component: UseropsComponent, canActivate: [AuthGuard] },
  { path: 'aboutme', component: AboutmeComponent, canActivate: [AuthGuard] },
  { path: 'updateuser', component: UpdateuserComponent, canActivate: [AuthGuard] },
  { path: 'updatetoken', component: UpdatetokenComponent, canActivate: [AuthGuard] },
  { path: 'createuser', component: CreateuserComponent, canActivate: [AuthGuard] },
  { path: 'createtoken', component: CreatetokenComponent, canActivate: [AuthGuard] },
  { path: 'repositoryinfo', component: RepositoryinfoComponent, canActivate: [AuthGuard] },
  { path: 'repousers', component: RepousersComponent, canActivate: [AuthGuard] },
  { path: 'usersgithub', component: UsersgithubComponent, canActivate: [AuthGuard] },
  { path: 'usersgithubops', component: UsergithubopsComponent, canActivate: [AuthGuard] },
  { path: 'repoops', component: RepoopsComponent, canActivate: [AuthGuard] },
  { path: 'commitsrepo', component: CommitsrepoComponent, canActivate: [AuthGuard] },
  { path: 'issuesrepo', component: IssuesrepoComponent, canActivate: [AuthGuard] },
  { path: 'productmetricsrepo', component: ProductmetricsrepoComponent, canActivate: [AuthGuard] },
  { path: 'testmetricsrepo', component: TestmetricsrepoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }