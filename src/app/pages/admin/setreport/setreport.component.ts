import { ReportService } from 'src/app/services/report/report.service';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-setreport',
  templateUrl: './setreport.component.html',
  styleUrls: ['./setreport.component.css']
})
export class SetreportComponent implements OnInit {
  value!:number
  @Input() iduser!:number
  constructor(private ReportService:ReportService) { }

  ngOnInit() {
    this.report(this.iduser)
  }
  report(id:number){
    this.ReportService.getByuserreportedsid(id).subscribe((response: any)=>{
          this.value=response.totalElements;
    })

    
  }
}
