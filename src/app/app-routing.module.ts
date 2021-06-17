  
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
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { RepositoryinfoComponent } from './components/repositoryinfo/repositoryinfo.component';
import { RepousersComponent } from './components/repousers/repousers.component';
import { UsersgithubComponent } from './components/usersgithub/usersgithub.component';
import { RepoopsComponent } from './components/repoops/repoops.component';
import { LoginComponent } from './components/login/login.component';


import { AuthGuard } from './guards';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: 'repositories', component: RepositoriesComponent, canActivate: [AuthGuard] },
  { path: 'repos', component: ReposComponent, canActivate: [AuthGuard] },
  { path: 'branches', component: BranchesComponent, canActivate: [AuthGuard] },
  { path: 'commitsmetrics', component: CommitsmetricsComponent, canActivate: [AuthGuard] },
  { path: 'commitsauthor', component: CommitsauthorComponent, canActivate: [AuthGuard] },
  { path: 'commitsauthorfechas', component: CommitsauthorfechasComponent, canActivate: [AuthGuard] },
  { path: 'userops', component: UseropsComponent, canActivate: [AuthGuard] },
  { path: 'aboutme', component: AboutmeComponent, canActivate: [AuthGuard] },
  { path: 'updateuser', component: UpdateuserComponent, canActivate: [AuthGuard] },
  { path: 'createuser', component: CreateuserComponent, canActivate: [AuthGuard] },
  { path: 'repositoryinfo', component: RepositoryinfoComponent, canActivate: [AuthGuard] },
  { path: 'repousers', component: RepousersComponent, canActivate: [AuthGuard] },
  { path: 'usersgithub', component: UsersgithubComponent, canActivate: [AuthGuard] },
  { path: 'repoops', component: RepoopsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }