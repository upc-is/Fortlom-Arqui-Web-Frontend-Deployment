import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-HomeFanatic',
  templateUrl: './HomeFanatic.component.html',
  styleUrls: ['./HomeFanatic.component.css']
})
export class HomeFanaticComponent implements OnInit {
  idnumber!:number
  constructor(private router:Router,private activeroute:ActivatedRoute) { }

  ngOnInit() {
    let pod=parseInt(this.activeroute.snapshot.paramMap.get('id')!);
    this.idnumber=pod;
    console.log(this.idnumber)
  }

  GoToChatBot(){
    this.router.navigate(['/HomeFanatic',this.idnumber,'fortlomchat'])
  }
}
