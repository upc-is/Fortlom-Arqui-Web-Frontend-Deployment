import { ActivatedRoute } from '@angular/router';
import { ForumcommentService } from 'src/app/services/forumcomment/forumcomment.service';
import { Forumcomment } from './../../../models/forumcomment';
import { Component, OnInit,ViewChild,Input } from '@angular/core';
import {NgForm} from "@angular/forms";
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { Forum } from 'src/app/models/forum';
import { ForumService } from 'src/app/services/forum/forum.service';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report/report.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogreportcommentComponent } from './dialogreportcomment/dialogreportcomment.component';
@Component({
  selector: 'app-Fanatic-Forumcomment',
  templateUrl: './Fanatic-Forumcomment.component.html',
  styleUrls: ['./Fanatic-Forumcomment.component.css'],
  providers: [DatePipe]
})
export class FanaticForumcommentComponent implements OnInit {

  commentdata !:Forumcomment;
  commentdatabyid !:Forumcomment;
  reportdescriptiondialog!:string;
  dataSource!:MatTableDataSource<any>;
  @ViewChild('commentdataForm', {static: false})
  commentdataForm !: NgForm;
  forumbyid!:Forum;
  fecha!:string;
     report!:Report
  displayedColumns: string[] = ['id', 'CommentDescription','forum','Date','actions'];
   @Input() comentarios!:number;
  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator !:MatPaginator;
  searchKey!:string;
  isEditMode = false;
  paso:string="vacio";
  myDate !: Date;
  proDate = new Date();
  proDatevalue!:string;
  userid!:number
  forumid!:number
  latest_date!:string
  constructor(private service:ForumcommentService,private serviceext:ForumService,private datePipe: DatePipe,
    private reportService:ReportService,private route:ActivatedRoute, public dialog:MatDialog) {
     this.commentdata={} as Forumcomment;
     this.commentdatabyid={} as Forumcomment;
     this.forumbyid={}as Forum;
     this.report={} as Report;
     this.dataSource=new MatTableDataSource<any>();

      
  }

  ngOnInit(): void {


    console.log(this.comentarios)
    //this.getAllcommentsperaforum() cambiar despues de la tb3
    //console.log(this.paso)
    //this.getAllComments()//cambiar despues de exponer
    this.getAllcommentsperaforum()

  }

  getAllComments(){
    this.service.getAll().subscribe((response: any) => {
      this.dataSource.data = response.content;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
      console.log("datos");
      console.log(this.dataSource.data)

    });


  }
  getAllcommentsperaforum(){
    console.log(this.comentarios)
    this.service.getallcommentsperforum(this.comentarios).subscribe((response: any) => {
      this.dataSource.data = response.content;
      console.log(this.dataSource.data)
    });


  }

getname(){

 this.paso=this.forumbyid.forumname;
  return this.paso;
}
getidComment(id:number){

this.service.getById(id).subscribe((response:any)=>{

  this.commentdatabyid=response;
  console.log(this.commentdatabyid.forum);

});


}

getidForum(id:number){
console.log("entro")
this.serviceext.getById(id).subscribe((response=>this.forumbyid=response))
console.log("medio")
console.log(this.forumbyid)
}


getfecha(sr:string){
this.fecha=sr;
}


  OnSearchClear(){
    this.searchKey="";
    this.applyfilter();


    }
    

    cancelEdit() {
      this.isEditMode = false;
      this.commentdataForm.resetForm();
    }

    applyfilter(){

      this.dataSource.filter=this.searchKey.trim().toLowerCase();


      }

      deleteItem(id: number) {
        this.service.delete(id).subscribe((response: any) => {
          this.dataSource.data = this.dataSource.data.filter((o: Forumcomment) => {
            return o.id !== id ? o : false;
          });
        });
        console.log(this.dataSource.data);
      }




addcomment(userid:number,forumid:number){

  console.log("user")
  console.log(userid)
  this.service.create(this.commentdata,userid,forumid).subscribe((response: any) => {
    this.dataSource.data.push( {...response});
    this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
  });


}






getfechacomment(fecha:Date){




this.proDate=fecha

this.proDatevalue = this.datePipe.transform(fecha, 'yyyy-MM-dd')!;


return this.proDatevalue

}
getUserId(id :number){


  return this.dataSource.data[id-1].user.id


  }






openDialog(id:number,commentid:number){
  
    const dialogRef = this.dialog.open(DialogreportcommentComponent, {
      width: '500px',
      data: {reportdescriptiondialog: this.reportdescriptiondialog},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.reportdescriptiondialog = result;
      console.log(this.reportdescriptiondialog);
      if(this.reportdescriptiondialog != null){
        this.flagPost(id,this.reportdescriptiondialog,commentid);
      }
    });
}

flagPost(id:number,descriptiondialog:string,commentid:number) {
  console.log(descriptiondialog);
  this.report.description=descriptiondialog
  console.log(this.report)
  this.reportService.createforcomment(this.report,+this.route.snapshot.params['id'],id,commentid)
    .subscribe((response: any) => {
      alert("reporte enviado")
      console.log(response);
    });
}
}
