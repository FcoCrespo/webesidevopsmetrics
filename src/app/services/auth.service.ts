import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    

    constructor(private http: HttpClient, private router: Router) {
        document.body.classList.add('bg-img');
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        const params = new HttpParams()
            .set('username', username)
            .set('password', password);
        return this.http.get(`${environment.apiUrl}/usuarios`, { params : params })
            .pipe(map(user => {
                // almacena detalles del usuario y el token jwt en el almacenamiento local para mantener al usuario logueado entre refrescos de página
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    public logout() {
        // elimina al usuario del almacenamiento local y marca el usuario actual como nulo
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        document.body.classList.remove('bg-img-white');
        this.router.navigate(['/']);
    }
}