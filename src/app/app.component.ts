import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MarkerService } from './marker.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  providers: [MarkerService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  name: string = '';
  phoneNo: number|undefined;
  markers:any = [
    {"coordinates":{"lat": -6.8816662,"lng": 107.6377027},"city":"Bandung","name":"The Common Place Skala","phoneNo":199518},
    {"coordinates":{"lat": -6.8876484,"lng": 107.6236724},"city":"Bandung","name":"Cafe Tangga","phoneNo":32094},
    {"coordinates":{"lat": -6.923034343999038, "lng": 107.6055908203125},"city":"Bandung","name":"Phoenix","phoneNo":1626078},
    {"coordinates":{ "lat": -7.164157214069853, "lng": 109.25354003906251 },"city":"Bandung","name":"Phoenix","phoneNo":1626078}
  ]

  constructor(public markerSrvc: MarkerService) {
    console.log(this.markerSrvc);
  }

  ngOnInit(){
    this.markerSrvc.drawMap();
    this.markerSrvc.dropMarker();
    this.markerSrvc.loadMarkers(this.markerSrvc.map, this.markers);
  }

  addnew(){
    const newitem = {
      "name": this.name,
      "phoneNo": this.phoneNo,
      "coordinates": this.markerSrvc.selectNewmarker,
      "city": "Bandung"
    }
    this.markers.push(newitem);
    this.markerSrvc.loadMarkers(this.markerSrvc.map, this.markers);
    // reset
    this.name = '';
    this.phoneNo = undefined;
  }

}
