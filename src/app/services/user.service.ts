import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserSubject: any;
    constructor(private http: HttpClient) { }

    getAll(tokenpass: string) {
        return this.http.get<any[]>(`${environment.apiUrl}/usuarios/all?tokenpass=${tokenpass}`);
    }

    getUser(tokenpass: string, username:string) {
        return this.http.get<any[]>(`${environment.apiUrl}/usuarios/getuser?tokenpass=${tokenpass}&username=${tokenpass}`);
    }

    register(tokenpass: string, user) {
        return this.http.post(`${environment.apiUrl}/usuarios?tokenpass=${tokenpass}`, user);
    }

    delete(tokenpass: string, username:string) {
        return this.http.delete(`${environment.apiUrl}/usuarios/deleteuser?tokenpass=${tokenpass}&username=${tokenpass}`);
    }

    update(tokenpass: string, username:string, user) {
        return this.http.put(`${environment.apiUrl}/usuarios/${username}?tokenpass=${tokenpass}`, user);
    }

    recoverpassword(username: string, email: string){
        return this.http.get<any[]>(`${environment.apiUrl}/usuarios/recoverpassword?username=${username}&email=${email}`);
    }

    getusersgithubfree(tokenpass: string) {
        return this.http.get<any[]>(`${environment.apiUrl}/usuarios/usersgithubfree?tokenpass=${tokenpass}`);
    }
}
