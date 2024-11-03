// navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen: boolean = false;
  user$: Observable<User | null>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.user$ = this.authService.user$;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}