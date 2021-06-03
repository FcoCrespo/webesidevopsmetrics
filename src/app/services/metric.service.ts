import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  currentUserSubject: any;
  constructor(private http: HttpClient) { }


  saveMetrics(reponame: string, owner: string) {
      return this.http.get<any[]>(`${environment.apiUrl}/metrics/savemetrics?reponame=${reponame}&owner=${owner}`);
  }

  getAllMetrics(tokenpass: string, branch: string, reponame: string, owner: string){
      return this.http.get<any[]>(`${environment.apiUrl}/metrics/allmetrics?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }

  getAllMetricsDate(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/metrics/allmetricsdate?tokenpass=${tokenpass}`, message);
  }
  
  saveTestMetrics(reponame: string, owner: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/metrics/savetestmetrics?reponame=${reponame}&owner=${owner}`);
  }

  getAllTestMetrics(tokenpass: string, branch: string, reponame: string, owner: string){
      return this.http.get<any[]>(`${environment.apiUrl}/metrics/alltestmetrics?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }

  getAllTestMetricsDate(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/metrics/alltestmetricsdate?tokenpass=${tokenpass}`, message);
  }

  
}
