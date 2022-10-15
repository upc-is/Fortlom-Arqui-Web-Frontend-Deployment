import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-artist',
  templateUrl: './home-artist.component.html',
  styleUrls: ['./home-artist.component.css']
})
export class HomeArtistComponent implements OnInit {
  idnumber!:number
  constructor(private router:Router,private activeroute:ActivatedRoute) { }

  ngOnInit(): void {
    let pod=parseInt(this.activeroute.snapshot.paramMap.get('id')!);
    this.idnumber=pod;
    console.log(this.idnumber)
  }
  
  GoToChatBot(){
    this.router.navigate(['/HomeArtist',this.idnumber,'fortlomchat'])
  }
}
