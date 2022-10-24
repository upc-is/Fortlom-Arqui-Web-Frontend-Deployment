import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from './../../../services/token/token.service';
@Component({
  selector: 'app-deleteContent',
  templateUrl: './deleteContent.component.html',
  styleUrls: ['./deleteContent.component.css']
})
export class DeleteContentComponent implements OnInit {
  selectedValue!: string;

  constructor(private cd:Router,private route:ActivatedRoute,private tokenService:TokenService) { }

  ngOnInit() {
  }
  select(content:number){
    this.cd.navigate(['/admin/delete',content])
  }
}
