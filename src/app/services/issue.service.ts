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
    const requestOptions: Object = {
      responseType: 'text'
    };
    return this.http.get<any[]>(`${environment.apiUrl}/issues/allissues?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`, requestOptions);
  }

  updateIssues(tokenpass: string, reponame: string, owner: string){
      return this.http.get<any[]>(`${environment.apiUrl}/issues/updateissues?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }
  
  getIssuesRepo(tokenpass: string, reponame: string, owner: string){
    return this.http.get<any[]>(`${environment.apiUrl}/issues/issuesrepo?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }

  getIssuesuser(tokenpass: string, reponame: string, owner: string, idUser: string){
    return this.http.get<any[]>(`${environment.apiUrl}/issues/issuesrepouser?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}&idUser=${idUser}`);
  }

  getIssuesRepoCreationDates(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/issues/issuesrepocreationdates?tokenpass=${tokenpass}`, message);
  }

  getIssuesRepoCreationDatesUser(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/issues/issuesrepocreationdatesuser?tokenpass=${tokenpass}`, message);
  }
    
  getIssuesRepoClosedDates(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/issues/issuesrepocloseddates?tokenpass=${tokenpass}`, message);
  }

  getIssuesRepoClosedDatesUser(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/issues/issuesrepocloseddatesuser?tokenpass=${tokenpass}`, message);
  }

  getIssuesRepoOpenedDates(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/issues/issuesrepoopeneddates?tokenpass=${tokenpass}`, message);
  }

  getIssuesRepoOpenedDatesUser(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/issues/issuesrepoopeneddatesuser?tokenpass=${tokenpass}`, message);
  }
}
