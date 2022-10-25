import { AdminService } from './../../../services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from './../../../services/token/token.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name!:any
  constructor(private cd:Router,private route:ActivatedRoute,private tokenService:TokenService,private AdminService:AdminService) { }

  ngOnInit() {
    this.name=this.tokenService.getUserName();
    console.log(this.name)
  }
  delete(){
    this.cd.navigate(['/admin/delete'])
  }
  create(){
    this.cd.navigate(['/admin/create'])
  }
  ban(){
    this.cd.navigate(['/admin/ban'])
  }
}
