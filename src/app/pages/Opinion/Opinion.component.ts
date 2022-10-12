import { Publication } from 'src/app/models/publication';
import { AnswerService } from './../../services/answer/answer.service';
import { Component, OnInit,Input } from '@angular/core';
import { Event } from 'src/app/models/event';
import { Content } from 'src/app/models/Content';

@Component({
  selector: 'app-Opinion',
  templateUrl: './Opinion.component.html',
  styleUrls: ['./Opinion.component.css']
})
export class OpinionComponent implements OnInit {
  @Input()
  content !: Publication;
  @Input()
  user !: number;
  likes!:number
  dislikes!:number
  constructor(private AnswerService:AnswerService) {

   }

  ngOnInit() {

    console.log(this.content)
    this.setlikes(this.content.id)
  }
  
  Increasinglikes(id:number){

    this.AnswerService.exists(id,this.user).subscribe((response:any)=>{
      console.log(response)
      if(response==false){
        this.AnswerService.createOpinion(this.user,id).subscribe((response:any)=>{

        })
      }
      else{
        this.AnswerService.getAllOpinionsByuserId(this.user).subscribe((response:any)=>{
                 for(var element of response.content){
                       if(element.contentid === this.content.id){
                             this.AnswerService.updateOpinion(element.id,true).subscribe((response:any)=>{
                              this.setlikes(this.content.id)
                             })
                       }
                 }
        })
      }

    })
  
  }
  decreaselikes(id:number){


    this.AnswerService.exists(id,this.user).subscribe((response:any)=>{
      if(response==false){
        this.AnswerService.createOpinion(this.user,id).subscribe((response:any)=>{

        })
      }
      else{
        this.AnswerService.getAllOpinionsByuserId(this.user).subscribe((response:any)=>{
                 for(var element of response.content){
                       if(element.contentid === this.content.id){
                             this.AnswerService.updateOpinion(element.id,false).subscribe((response:any)=>{
                                     this.setlikes(this.content.id)
                             })
                       }
                 }
        })
      }

    })






  }

  setlikes(conten:number){
    this.AnswerService.getAllOpinionsByagreeandContentId(conten,true).subscribe((response:any)=>{
        this.likes=response.content.length 
        console.log(this.likes)
    })
  }
}
