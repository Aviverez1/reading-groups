// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot 
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map(user => {
        console.log('AuthGuard checking user:', user);
        
        if (user) {
          return true;
        }
        
        this.router.navigate(['/auth/login'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      })
    );
  }
}