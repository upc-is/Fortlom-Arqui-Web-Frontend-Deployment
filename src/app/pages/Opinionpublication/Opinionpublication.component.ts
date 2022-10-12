import { AnswerService } from './../../services/answer/answer.service';
import { Component, OnInit,Input } from '@angular/core';
import { Content } from 'src/app/models/Content';

@Component({
  selector: 'app-Opinionpublication',
  templateUrl: './Opinionpublication.component.html',
  styleUrls: ['./Opinionpublication.component.css']
})
export class OpinionpublicationComponent implements OnInit {

  @Input()
  content !: Content;
  @Input()
  user !: number;
  likes!:number
  dislikes!:number;
  constructor(private AnswerService:AnswerService) {

   }

  ngOnInit() {

    console.log(this.content)
    this.setlikes(this.content.id)
    this.setdislikes(this.content.id)
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
                              this.setdislikes(this.content.id)
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
                                     this.setdislikes(this.content.id)
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
  setdislikes(conten:number){
    this.AnswerService.getAllOpinionsByagreeandContentId(conten,false).subscribe((response:any)=>{
        this.dislikes=response.content.length 
        console.log(this.dislikes)
    })
  }
}
