import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Routes protégées par la garde AuthGuard
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard] // La garde d'authentification protège cette route
  },
  {
    path: 'users',
    loadComponent: () => import('./components/users/users.component')
      .then(m => m.UsersComponent),
    canActivate: [AuthGuard] // Protéger également la route 'users'
  },
  {
    path: 'missions',
    loadComponent: () => import('./components/missions/missions.component')
      .then(m => m.MissionsComponent),
    canActivate: [AuthGuard] // Protéger la route 'missions'
  },
  {
    path: 'timesheets',
    loadComponent: () => import('./components/timesheets/timesheets.component')
      .then(m => m.TimesheetsComponent),
    canActivate: [AuthGuard] // Protéger la route 'timesheets'
  },
  {
    path: 'invoices',
    loadComponent: () => import('./components/invoices/invoices.component')
      .then(m => m.InvoicesComponent),
    canActivate: [AuthGuard] // Protéger la route 'invoices'
  }
];
