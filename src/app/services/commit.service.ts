import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommitService {

  currentUserSubject: any;
  constructor(private http: HttpClient) { }


  getRepositories(tokenpass: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/commits/allrepositories?tokenpass=${tokenpass}`);
  }

  getBranches(tokenpass: string, reponame: string, owner: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/commits/allbranches?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }

  getBranchesFirstCommit(tokenpass: string, reponame: string, owner: string) {
    console.log(`${environment.apiUrl}/commits/branchesfirstcommit?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
    return this.http.get<any[]>(`${environment.apiUrl}/commits/branchesfirstcommit?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }

  getCommits(tokenpass: string, reponame: string, owner: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/commits/allcommits?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }

  getCommitsBranch(tokenpass: string, branch: string, reponame: string, owner: string){
    return this.http.get<any[]>(`${environment.apiUrl}/commits/commitsbranch?tokenpass=${tokenpass}&branch=${branch}&reponame=${reponame}&owner=${owner}`);
  }
  
  getCommitsBranchAuthor(tokenpass: string, branch: string, authorname: string, reponame: string, owner: string){
    return this.http.get<any[]>(`${environment.apiUrl}/commits/commitsbranchauthor?tokenpass=${tokenpass}&branch=${branch}&reponame=${reponame}&authorname=${authorname}&owner=${owner}`);
  }

  getUserGithub(tokenpass: string){
    return this.http.get<any[]>(`${environment.apiUrl}/commits/usersgithub?tokenpass=${tokenpass}`);
  }

  getUserGithubRepo(tokenpass: string, reponame: string, owner: string){
    return this.http.get<any[]>(`${environment.apiUrl}/commits/usersgithubrepo?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }

  getLastCommitRepo(tokenpass: string, reponame: string){
    return this.http.get<any[]>(`${environment.apiUrl}/commits/getlastcommit?tokenpass=${tokenpass}&reponame=${reponame}`);
  }

  getCommitsBranchAuthorDates(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/commits/commitsbranchdateauthor?tokenpass=${tokenpass}`, message);
  }
    
}
