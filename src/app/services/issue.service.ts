import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  currentUserSubject: any;
  constructor(private http: HttpClient) { }


  getIssues(tokenpass: string, reponame: string, owner: string) {
      return this.http.get<any[]>(`${environment.apiUrl}/issues/allissues?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }

  updateIssues(tokenpass: string, branch: string, reponame: string, owner: string){
      return this.http.get<any[]>(`${environment.apiUrl}/issues/updateissues?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }
  
  getIssuesRepo(tokenpass: string, branch: string, authorname: string, reponame: string, owner: string){
    return this.http.get<any[]>(`${environment.apiUrl}/issues/issuesrepo?tokenpass=${tokenpass}&branch=${branch}&reponame=${reponame}&authorname=${authorname}&owner=${owner}`);
  }

  getIssuesRepoCreationDates(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/issues/issuesrepocreationdates?tokenpass=${tokenpass}`, message);
  }
    
  getIssuesRepoClosedDates(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/issues/issuesrepocloseddates?tokenpass=${tokenpass}`, message);
  }

  getIssuesRepoOpenedDates(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/issues/issuesrepoopeneddates?tokenpass=${tokenpass}`, message);
  }
}
