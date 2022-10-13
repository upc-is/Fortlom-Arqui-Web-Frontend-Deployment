import { MultimediaService } from 'src/app/services/multimedia/multimedia.service';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-imageforlist',
  templateUrl: './imageforlist.component.html',
  styleUrls: ['./imageforlist.component.css']
})
export class ImageforlistComponent implements OnInit {
  @Input()
  artist!:number
  constructor(private MultimediaService:MultimediaService) { }
  retrievedImage!:string
  ngOnInit() {



      this.getImage()

  }
  getImage(){
    this.MultimediaService.getImageByUserId(this.artist).subscribe((response: any)=>{
           this.retrievedImage=response.content[0].imagenUrl
    })
}

}
