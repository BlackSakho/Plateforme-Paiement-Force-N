import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component"; // Importer le composant HomeComponent
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/auth/login.component";
import { RegisterComponent } from "./components/auth/register.component";
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";
import { MentorDashboardComponent } from "./components/mentor/mentor-dashboard.component";
import { AttendanceFormComponent } from "./components/mentor/attendance-form.component";
import { FactureDetailMentorComponent } from "./components/mentor/facture-detail-mentor.component";
import { AdminLayoutComponent } from "./components/admin/admin-layout/admin-layout.component";
import { AdminDashboardComponent } from "./components/admin/dashboard/admin-dashboard.component";


export const routes: Routes = [
  { path: "", component: HomeComponent }, // Route par défaut pour la page d'accueil
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  // Routes protégées par la garde AuthGuard
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["consultant"] },
  },
  {
    path: "mentor-dashboard",
    component: MentorDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["mentor"] },
  },
  {
    path: "attendance",
    component: AttendanceFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["mentor"] },
  },
  {
    path: "users",
    loadComponent: () =>
      import("./components/users/users.component").then(
        (m) => m.UsersComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "missions",
    loadComponent: () =>
      import("./components/mentor/missions/missions.component").then(
        (m) => m.MissionsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "timesheets",
    loadComponent: () =>
      import("./components/timesheets/timesheets.component").then(
        (m) => m.TimesheetsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "user-attendance",
    loadComponent: () =>
      import("./components/mentor/user-attendance.component").then(
        (m) => m.UserAttendanceComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "invoices",
    loadComponent: () =>
      import("./components/invoices/invoices.component").then(
        (m) => m.InvoicesComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "consultant-missions",
    loadComponent: () =>
      import("./components/consultant/consultant-missions.component").then(
        (m) => m.ConsultantMissionsComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["consultant"] },
  },

  // Routes pour le comptable
  {
    path: "accountant-dashboard",
    loadComponent: () =>
      import("./components/accountant/accountant-dashboard.component").then(
        (m) => m.AccountantDashboardComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["comptable"] },
  },
  {
    path: "accountant-payments",
    loadComponent: () =>
      import("./components/accountant/accountant-payments.component").then(
        (m) => m.AccountantPaymentsComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["comptable"] },
  },
  {
    path: "validated-presences",
    loadComponent: () =>
      import("./components/accountant/validated-presences.component").then(
        (m) => m.ValidatedPresencesComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["comptable"] },
  },
  {
    path: "invoice/:id",
    loadComponent: () =>
      import("./components/accountant/invoice-view.component").then(
        (m) => m.InvoiceViewComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["comptable"] }, // ou adapte selon les rôles autorisés
  },
  {
    path: "mentor-invoices",
    loadComponent: () =>
      import("./components/mentor/facture-mentor.component").then(
        (m) => m.FacturesMentorComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["mentor"] },
  },
  {
    path: 'facture/:id',
    component: FactureDetailMentorComponent
  },
  {
    path: "admin/dashboard",
    loadComponent: () =>
      import("./components/admin/dashboard/admin-dashboard.component").then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["admin"] }
  },

  

  { path: "**", redirectTo: "" }, // Rediriger toutes les routes non définies vers la page d'accueil
];
