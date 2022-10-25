import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './../../services/admin/admin.service';
import { TokenService } from './../../services/token/token.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  realRol!: string;
  constructor(private tokenService: TokenService,
    private router: Router,
    private AdminService:AdminService){

    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const expectedRol = route.data.expectedRol;
    if(this.tokenService.isadmin()){
      this.realRol='Role_Admin'
    }else{
      this.realRol = this.tokenService.isartist() ? 'Role_Artist' : 'Role_Upgrade_Artist';
      console.log(this.realRol)
    }
    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0) {
      this.router.navigate(['/adminlogin']);
      return false;
    }
    console.log("es admin")
    return true;




  }
  
}
