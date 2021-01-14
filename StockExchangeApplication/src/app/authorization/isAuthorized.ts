import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({ providedIn: 'root' })
export class isAuthorized implements CanActivate {
    constructor(
        private router: Router,
        private autorizationService: AuthorizationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.autorizationService.userValue;

        if (user) {
            return true;
        }

        this.router.navigate(['/home/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}