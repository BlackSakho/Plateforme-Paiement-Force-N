import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = route.data["roles"] as Array<string>;
    if (this.authService.hasAnyRole(roles)) {
      return true;
    }

    // Rediriger vers le tableau de bord par défaut si l'utilisateur n'a pas le rôle requis
    this.authService.redirectToDashboard();
    return false;
  }
}
