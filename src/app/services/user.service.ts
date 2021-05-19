import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserSubject: any;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/usuarios`);
    }
    getUsersByRole(rol) {
        return this.http.get<any[]>(`${environment.apiUrl}/usuarios/${rol}`);
    }

    register(user) {
        return this.http.post(`${environment.apiUrl}/usuarios`, user);
    }

    delete(id) {
        return this.http.delete(`${environment.apiUrl}/usuarios/${id}`);
    }
    update(user,id) {
        return this.http.put(`${environment.apiUrl}/usuarios/${id}`, user);
    }
}
