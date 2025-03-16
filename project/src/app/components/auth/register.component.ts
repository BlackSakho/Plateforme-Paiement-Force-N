import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-card card">
        <h2>Inscription - FORCE-N Platform</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="firstname">First Name</label>
            <input 
              type="text" 
              id="firstname" 
              formControlName="firstname" 
              class="form-control"
            >
          </div>
          <div class="form-group">
            <label for="name">Last Name</label>
            <input 
              type="text" 
              id="name" 
              formControlName="name" 
              class="form-control"
            >
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email" 
              class="form-control"
            >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              class="form-control"
            >
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <select 
              id="role" 
              formControlName="role" 
              class="form-control"
            >
              <option value="mentor">Mentor</option>
              <option value="consultant">Consultant</option>
            </select>
          </div>
          <button type="submit" class="btn-primary" [disabled]="registerForm.invalid">
            Register
          </button>
          <p class="text-center mt-3">
            Already have an account? 
            <a href="/login" class="text-primary">Login here</a>
          </p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--light-gray);
    }
    
    .login-card {
      width: 100%;
      max-width: 400px;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-top: 4px;
    }
    
    h2 {
      color: var(--primary-green);
      text-align: center;
      margin-bottom: 2rem;
    }

    .text-center {
      text-align: center;
    }

    .mt-3 {
      margin-top: 1rem;
    }

    .text-primary {
      color: var(--primary-green);
      text-decoration: none;
    }

    .text-primary:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['mentor', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          // Handle error (show message to user)
        }
      });
    }
  }
}