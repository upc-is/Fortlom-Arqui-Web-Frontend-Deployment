import { AdminService } from './../../services/admin/admin.service';
import { TokenService } from './../../services/token/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminloginGuard implements CanActivate {
  realRol!: string;
  constructor(private tokenService: TokenService,
    private router: Router,
    private AdminService:AdminService){

    }
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {

    if (this.tokenService.isLogged()) {

      const expectedRol = next.data.expectedRol;
       console.log(expectedRol)
      if(this.tokenService.isadmin()){
        this.realRol='Role_Admin'
      }else{
        this.realRol = this.tokenService.isartist() ? 'Role_Artist' : 'Role_Upgrade_Artist';
        console.log(this.realRol)
      }
      if(this.realRol=='Role_Admin'){
        this.AdminService.GetAdmin(this.tokenService.getUserName()).subscribe((response:any)=>{

          this.router.navigate([`/admin`]);
          return false;
        })
       }





    }
   
    









    console.log("ingresados")
    return true;


  }
  










}
