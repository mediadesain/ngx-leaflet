import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  providers: [MapService],
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
    {"coordinates":{"lat": -7.164157214069853, "lng": 109.25354003906251},"city":"Bandung","name":"Phoenix","phoneNo":1626078},
    {"coordinates":{"lat": -7.335226656468705, "lng": 108.22700500488283},"city":"Tasikmalaya","name":"Rindu Kampung","phoneNo":1626078},
  ]

  constructor(public markerSrvc: MapService) {
    console.log(this.markerSrvc);
  }

  ngOnInit(){
    this.markerSrvc.drawMap();
    this.markerSrvc.setMarkerData(this.markers);
    this.markerSrvc.loadMarkers();
    this.markerSrvc.dropMarker();
    this.markerSrvc.addAreaRadius();
  }

  addnew(){
    const newitem = {
      "name": this.name,
      "phoneNo": this.phoneNo,
      "coordinates": this.markerSrvc.newDropMarkerLatLng,
      "city": "Bandung"
    }
    this.markers.push(newitem);
    this.markerSrvc.loadMarkers();
    // reset
    this.markerSrvc.resetSelected();
    this.name = '';
    this.phoneNo = undefined;
  }

  goTo(){
    this.markerSrvc.selectViewPoint([-7.164157214069853,109.25354003906251]);
  }

}
