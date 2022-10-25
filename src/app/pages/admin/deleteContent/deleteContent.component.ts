import { PublicationService } from 'src/app/services/publication/publication.service';
import { Publication } from './../../../models/publication';
import { EventService } from './../../../services/event/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from './../../../services/token/token.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-deleteContent',
  templateUrl: './deleteContent.component.html',
  styleUrls: ['./deleteContent.component.css']
})
export class DeleteContentComponent implements OnInit {
  selectedValue!: string;
  isevent!:boolean
  ispublication!:boolean
  dataSource !:MatTableDataSource<any>;
  constructor(private cd:Router,private route:ActivatedRoute,private tokenService:TokenService,private EventService:EventService,private PublicationService:PublicationService) {  
    this.dataSource = new MatTableDataSource<any>(); }

  ngOnInit() {
     
  


  }
  change(){
   if(this.selectedValue=="event"){
       this.isevent=true
       this.ispublication=false;
       this.goevent()
   }
   if(this.selectedValue=="publication"){
    this.isevent=false
    this.ispublication=true;
    this.gopublic()
}


  }
  goevent(){
    this.EventService.getAll().subscribe((response:any)=>{
         this.dataSource.data = response.content;
         console.log( this.dataSource.data)
    })
  }
  gopublic(){
    this.PublicationService.getAll().subscribe((response:any)=>{
        this.dataSource.data = response.content;
         console.log( this.dataSource.data)
    })
  }

  select(content:number){
    this.cd.navigate(['/admin/delete',content])
    //console.log(this.selectedValue)
  }
}
