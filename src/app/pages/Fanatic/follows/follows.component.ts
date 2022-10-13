import { Artist } from './../../../models/artist';
import { FollowService } from './../../../services/follow/follow.service';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {
  @Input()
  artist !: Artist;
  @Input()
  user !: number;
  constructor(private FollowService:FollowService) { }
  follows!:number
  ngOnInit() {
    this.setfollows(this.artist.id)
    console.log(this.artist)
  }
  follow(artist:number){

     this.FollowService.existsByfanaticartistsId(artist,this.user).subscribe((response:any)=>{
      console.log(response)
      if(response==false){
        console.log(artist)
        console.log(this.user)
        this.FollowService.create(this.user,artist,true).subscribe((response:any)=>{
          console.log("aa")
          this.setfollows(this.artist.id)
        })
        }else{
           this.FollowService.getByartistsId(artist).subscribe((response:any)=>{
                          for(var element of response.content){
                            console.log(element)
                            if(element.artistid === this.artist.id){
                              this.FollowService.update(element.id,true).subscribe((response:any)=>{
                                this.setfollows(this.artist.id)
                              })
                             }
                          }
           })
        }



     })

  }
  setfollows(artist:number){
      this.FollowService.getByfanaticartistsId(artist,true).subscribe((response:any)=>{
              this.follows=response.content.length
      })
  }
  unfollow(artist:number){

    this.FollowService.existsByfanaticartistsId(artist,this.user).subscribe((response:any)=>{
      if(response==false){
        this.FollowService.create(this.user,artist,false).subscribe((response:any)=>{
          this.setfollows(this.artist.id)
        })

      }else{
        this.FollowService.getByartistsId(artist).subscribe((response:any)=>{
          for(var element of response.content){
            console.log(element)
            if(element.artistid === this.artist.id){
              this.FollowService.update(element.id,false).subscribe((response:any)=>{
                this.setfollows(this.artist.id)
              })
             }
          }
})
      }

    })


  }
}
