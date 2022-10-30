import { AnswerService } from './../../services/answer/answer.service';
import { Component, OnInit,Input } from '@angular/core';
import { Content } from 'src/app/models/Content';
import { Opinion } from 'src/app/models/Opinion';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-Opinionpublication',
  templateUrl: './Opinionpublication.component.html',
  styleUrls: ['./Opinionpublication.component.css'],
  providers: [DatePipe]
})
export class OpinionpublicationComponent implements OnInit {

  @Input()
  content !: Content;
  @Input()
  user !: number;
  likes!:number
  dislikes!:number;
  Opinion!:Opinion
  date!:Date
  constructor(private AnswerService:AnswerService) {
          this.Opinion = {} as Opinion
   }

  ngOnInit() {

    console.log(this.content)
    this.setlikes(this.content.id)
    this.setdislikes(this.content.id)
    this.date=new Date();
  }
  
  Increasinglikes(id:number){

    this.AnswerService.exists(id,this.user).subscribe((response:any)=>{
      console.log(response)
      if(response==false){
        this.Opinion.agree=true
                this.Opinion.registerdate=this.date
        this.AnswerService.createOpinion(this.user,id,this.Opinion).subscribe((response:any)=>{
                
                this.setlikes(this.content.id)
                this.setdislikes(this.content.id)
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
        this.Opinion.agree=false
               this.Opinion.registerdate=this.date
        this.AnswerService.createOpinion(this.user,id,this.Opinion).subscribe((response:any)=>{
               

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
