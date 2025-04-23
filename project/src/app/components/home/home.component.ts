import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  template: `
    <div class="hero-section">
      <div class="hero-content">
        <h1>Bienvenue sur <span>FORCE-N</span></h1>
        <p>
          La plateforme numérique dédiée au renforcement de l'employabilité à travers des formations innovantes.
        </p>
        <div class="actions">
          <button mat-raised-button color="primary" routerLink="/login">
            Se connecter
          </button>
          <button mat-raised-button color="accent" routerLink="/register">
            Créer un compte
          </button>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://img.freepik.com/vecteurs-premium/illustrations-vectorielles-dessin-anime-isolees-du-gestionnaire-informatique_107173-21656.jpg?w=2000" alt="Formation illustration" />
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: linear-gradient(to right, #ffffff, #f1f7ff);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 20px;
    }

    .hero-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      justify-content: center;
      min-height: 90vh;
      padding: 2rem;
    }

    @media (min-width: 768px) {
      .hero-section {
        flex-direction: row;
        text-align: left;
      }
    }

    .hero-content {
      flex: 1;
      padding: 20px;
    }

    .hero-content h1 {
      font-size: 2.8rem;
      color: #0057A0;
      margin-bottom: 1rem;
    }

    .hero-content h1 span {
      color: #F7941D;
    }

    .hero-content p {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 2rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    @media (min-width: 768px) {
      .actions {
        justify-content: flex-start;
      }
    }

    .hero-image {
      flex: 1;
      padding: 20px;
    }

    .hero-image img {
      max-width: 100%;
      height: auto;
    }

    button[mat-raised-button] {
      font-weight: bold;
      padding: 10px 20px;
    }
  `]
})
export class HomeComponent {}
