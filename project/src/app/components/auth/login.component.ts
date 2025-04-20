import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-page">
      <div class="login-wrapper">
        <div class="login-illustration">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
            alt="Login Illustration"
          />
        </div>

        <div class="login-card">
          <h2>Bienvenue sur <span>FORCE-N</span></h2>
          <p class="subtitle">Connectez-vous pour accéder à votre espace</p>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="email">Adresse e-mail</label>
              <input
                type="email"
                id="email"
                formControlName="email"
                placeholder="votre@email.com"
              />
            </div>

            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                formControlName="password"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              [disabled]="loginForm.invalid"
              class="btn-login"
            >
              Se connecter
            </button>

            <p class="bottom-text">
              Pas encore inscrit ?
              <a routerLink="/register">Créer un compte</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .login-page {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(to right, #ffffff, #f1f7ff);
        font-family: "Segoe UI", sans-serif;
        padding: 2rem;
      }

      .login-wrapper {
        display: flex;
        background-color: white;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        overflow: hidden;
        max-width: 900px;
        width: 100%;
        flex-direction: column;
      }

      @media (min-width: 768px) {
        .login-wrapper {
          flex-direction: row;
        }
      }

      .login-illustration {
        background-color: #f7f9fc;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
      }

      .login-illustration img {
        max-width: 100%;
        height: auto;
      }

      .login-card {
        flex: 1;
        padding: 2rem;
      }

      .login-card h2 {
        text-align: center;
        color: #0057a0;
        font-size: 2rem;
        margin-bottom: 10px;
      }

      .login-card h2 span {
        color: #f7941d;
      }

      .subtitle {
        text-align: center;
        color: #666;
        font-size: 1rem;
        margin-bottom: 2rem;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #333;
      }

      .form-group input {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
      }

      .btn-login {
        width: 100%;
        padding: 0.9rem;
        background-color: #0057a0;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .btn-login:hover {
        background-color: #003f7d;
      }

      .bottom-text {
        text-align: center;
        margin-top: 1rem;
        font-size: 0.95rem;
      }

      .bottom-text a {
        color: #f7941d;
        text-decoration: none;
        font-weight: bold;
      }

      .bottom-text a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          // Stocker le token et le rôle dans le localStorage
          localStorage.setItem("token", response.token);
          localStorage.setItem("role", response.user.role);

          // Rediriger en fonction du rôle
          const role = response.user.role;
          if (role === "comptable") {
            this.router.navigate(["/accountant-dashboard"]); // Rediriger vers le dashboard comptable
          } else if (role === "mentor") {
            this.router.navigate(["/mentor-dashboard"]); // Rediriger vers le dashboard mentor
          } else if (role === "admin") {
            this.router.navigate(["/dashboard"]); // Rediriger vers le dashboard admin
          } else {
            this.router.navigate(["/"]); // Rediriger vers la page d'accueil par défaut
          }
        },
        error: (error) => {
          console.error("Erreur de connexion :", error);
          alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
        },
      });
    }
  }
}
