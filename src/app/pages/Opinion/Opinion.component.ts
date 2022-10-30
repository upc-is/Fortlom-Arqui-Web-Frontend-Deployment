import { Opinion } from './../../models/Opinion';
import { Publication } from 'src/app/models/publication';
import { AnswerService } from './../../services/answer/answer.service';
import { Component, OnInit,Input } from '@angular/core';
import { Event } from 'src/app/models/event';
import { Content } from 'src/app/models/Content';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-Opinion',
  templateUrl: './Opinion.component.html',
  styleUrls: ['./Opinion.component.css'],
  providers: [DatePipe]
})
export class OpinionComponent implements OnInit {
  @Input()
  content !: Publication;
  @Input()
  user !: number;
  likes!:number
  dislikes!:number
  Opinion!:Opinion
  date!:Date
  constructor(private AnswerService:AnswerService) {
    this.Opinion = {} as Opinion
   }

  ngOnInit() {

    console.log(this.content)
    console.log(this.user)
    this.setlikes(this.content.id)
    this.date=new Date();
  }
  
  Increasinglikes(id:number){

    this.AnswerService.exists(id,this.user).subscribe((response:any)=>{
      console.log(response)
      console.log("entro")
      if(response==false){
        this.Opinion.agree=true
        this.Opinion.registerdate=this.date
        this.AnswerService.createOpinion(this.user,id,this.Opinion).subscribe((response:any)=>{
          console.log("existe")
          this.setlikes(this.content.id)
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
        this.Opinion.agree=true
        this.Opinion.registerdate=this.date
        this.AnswerService.createOpinion(this.user,id,this.Opinion).subscribe((response:any)=>{
          this.setlikes(this.content.id)
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
