import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from './../../../services/token/token.service';
@Component({
  selector: 'app-deleteespec',
  templateUrl: './deleteespec.component.html',
  styleUrls: ['./deleteespec.component.css']
})
export class DeleteespecComponent implements OnInit {

  constructor(private cd:Router,private route:ActivatedRoute,private tokenService:TokenService) { }

  ngOnInit() {
  }

}
