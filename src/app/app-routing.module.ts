  
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositoriesComponent } from './components/repositories/repositories.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'repositories', component: RepositoriesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }