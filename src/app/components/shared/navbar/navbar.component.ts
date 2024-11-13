import { Component, HostListener, Renderer2, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  isMenuOpen: boolean = false;
  user$: Observable<User | null>;
  private clickListener: () => void;

  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2
  ) {
    this.user$ = this.authService.user$;
    this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
      this.handleDocumentClick(event);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout() {
    this.authService.logout();
    this.isMenuOpen = false;
    this.router.navigate(['/']); 
  }

  handleDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar')) {
      this.isMenuOpen = false;
    }
  }

  ngOnDestroy() {
    if (this.clickListener) {
      this.clickListener();
    }
  }
}