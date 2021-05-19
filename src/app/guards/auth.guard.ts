import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            // autorizado, por tanto devolvemos true
            return true;
        }
        document.body.classList.add('bg-img');
        // no está logueado por tanto redirigimos a la página de login
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}