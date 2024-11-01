// src/app/components/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  loading: boolean = false;
  returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    try {
      await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.router.navigate([this.returnUrl]);
    } catch (error: any) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  }
}