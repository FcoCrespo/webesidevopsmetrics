import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  currentUserSubject: any;
  
  constructor(private http: HttpClient) { }


  saveMetrics(tokenpass: string, reponame: string, owner: string) {
    const requestOptions: Object = {
      responseType: 'text'
    };
    return this.http.get<any[]>(`${environment.apiUrl}/metrics/savemetrics?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`, requestOptions);
  }

  getAllMetrics(tokenpass: string, branch: string, reponame: string, owner: string){
      return this.http.get<any[]>(`${environment.apiUrl}/metrics/allmetrics?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }

  getAllMetricsDate(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/metrics/allmetricsdate?tokenpass=${tokenpass}`, message);
  }
  
  saveTestMetrics(tokenpass: string, reponame: string, owner: string) {
    const requestOptions: Object = {
      responseType: 'text'
    };
    return this.http.get<any[]>(`${environment.apiUrl}/metrics/savetestmetrics?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`, requestOptions);
  }

  getAllTestMetrics(tokenpass: string, branch: string, reponame: string, owner: string){
      return this.http.get<any[]>(`${environment.apiUrl}/metrics/alltestmetrics?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }

  getAllTestMetricsDate(tokenpass: string, message){
    return this.http.post<any[]>(`${environment.apiUrl}/metrics/alltestmetricsdate?tokenpass=${tokenpass}`, message);
  }

  
}
