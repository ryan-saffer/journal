import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NegateAuthGuard implements CanActivate {    
  
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     if (this.authService.isLoggedIn) {
        this.router.navigate(['journals'])
     }
     return true
  }
}