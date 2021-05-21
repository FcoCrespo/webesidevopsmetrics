  
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositoriesComponent } from './components/repositories/repositories.component';
import { ReposComponent } from './components/repos/repos.component';
import { BranchesComponent } from './components/branches/branches.component';
import { CommitsmetricsComponent } from './components/commitsmetrics/commitsmetrics.component';
import { CommitsauthorComponent } from './components/commitsauthor/commitsauthor.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: 'repositories', component: RepositoriesComponent, canActivate: [AuthGuard] },
  { path: 'repos', component: ReposComponent, canActivate: [AuthGuard] },
  { path: 'branches', component: BranchesComponent, canActivate: [AuthGuard] },
  { path: 'commitsmetrics', component: CommitsmetricsComponent, canActivate: [AuthGuard] },
  { path: 'commitsauthor', component: CommitsauthorComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }