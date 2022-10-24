import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createContent',
  templateUrl: './createContent.component.html',
  styleUrls: ['./createContent.component.css']
})
export class CreateContentComponent implements OnInit {
  img!:any;
  selectedFile!: File;
  selectedValue!: string;

  constructor() { }

  ngOnInit() {
    this.img="https://cdn.discordapp.com/attachments/1008578583251406990/1033911806848147456/image_23.png"
  }
  onFileChanged(event:any){
    this.selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('multipartFile', this.selectedFile);
    this.img=formData
    
  }
}
