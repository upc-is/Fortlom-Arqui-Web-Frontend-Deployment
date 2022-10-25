import { AdminService } from './../../../services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/LoginUser';
import { TokenService } from 'src/app/services/token/token.service';
@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {
  public loginform!:FormGroup;
  loginUsuario!: LoginUser;
  errMsj!: string;
  constructor(private formBuilder:FormBuilder,private route:Router,private AdminService:AdminService,private tokenService: TokenService) {
    this.loginUsuario={}as LoginUser
   }

  ngOnInit(): void {
    this.loginform=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]



     })
  }
  onSubmit(){
    console.log(this.loginform.value.email)
    console.log(this.loginform.value.password)

 this.loginUsuario.password=this.loginform.value.password
 this.loginUsuario.nombreUsuario=this.loginform.value.email
 //console.log(this.loginUsuario)
 this.AdminService.LogUser(this.loginUsuario).subscribe(
  data=>{
    this.tokenService.setToken(data.token)
    if(this.tokenService.isadmin()==true){
      console.log("es fanatic")
      this.AdminService.GetAdmin(this.tokenService.getUserName()).subscribe((response:any)=>{

        this.route.navigate([`/admin`]);
      })
      
    }

  },err=>{
    this.errMsj = err.error.message;
  }
 )


 
  }

}
