import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from './../../../services/token/token.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cd:Router,private route:ActivatedRoute,private tokenService:TokenService) { }

  ngOnInit() {
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
