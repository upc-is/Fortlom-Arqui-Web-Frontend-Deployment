import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banPerson',
  templateUrl: './banPerson.component.html',
  styleUrls: ['./banPerson.component.css']
})
export class BanPersonComponent implements OnInit {
  selectedValue!: string;
  constructor() { }

  ngOnInit() {
  }

}
