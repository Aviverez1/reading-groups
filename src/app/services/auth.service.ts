// src/app/services/auth.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private auth = getAuth();
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  private authStateUnsubscribe: any;

  constructor() {
    // Listen to auth state changes
    this.authStateUnsubscribe = onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  ngOnDestroy() {
    if (this.authStateUnsubscribe) {
      this.authStateUnsubscribe();
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.userSubject.next(userCredential.user);
      return userCredential.user;
    } catch (error: any) {
      console.error('Login error:', error);
      throw this.handleAuthError(error);
    }
  }

  async signup(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.userSubject.next(userCredential.user);
      return userCredential.user;
    } catch (error: any) {
      console.error('Signup error:', error);
      throw this.handleAuthError(error);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.userSubject.next(null); 
    } catch (error) {
      console.error('Logout error:', error);
      throw 'Error during logout';
    }
  }

  private handleAuthError(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered';
      case 'auth/invalid-email':
        return 'Invalid email format';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled';
      case 'auth/weak-password':
        return 'Password is too weak';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      default:
        return 'An error occurred during authentication';
    }
  }
}