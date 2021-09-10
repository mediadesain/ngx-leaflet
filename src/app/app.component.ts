import { Component, OnInit } from '@angular/core';
import { MarkerService } from './geolocation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  markers:any = [
    {"coordinates":{"lat": -6.8816662,"lng": 107.6377027},"city":"Bandung","name":"The Common Place Skala","population":199518},
    {"coordinates":{"lat": -6.8876484,"lng": 107.6236724},"city":"Bandung","name":"Cafe Tangga","population":32094},
    {"coordinates":{"lat": -112.073844,"lng": 33.448457},"city":"Bandung","name":"Phoenix","population":1626078}
  ]
  constructor(
    public markerSrvc: MarkerService
  ) {
    console.log(this.markerSrvc)
  }
  
  
  ngOnInit() {
    // this.markerSrvc.drawMap();
    // this.markerSrvc.loadMarkers(this.markerSrvc.map, this.markers);
    // this.markerSrvc.map.once('click', (e) => {
    //   const marker = new L.Marker([e.latlng.lat, e.latlng.lng],{ draggable: true })
    //   marker.addTo(this.markerSrvc.map);
    //   // alert(marker.getLatLng());
    //   console.log(this.markerSrvc.map)
    // })
    this.markerSrvc.drawMap()
    this.markerSrvc.dropMarker()
    this.markerSrvc.loadMarkers(this.markerSrvc.map, this.markers);
  }

  addnew(){
    const newitem = {"type":"Feature","geometry":{"type":"Point","coordinates":[-6.9473949,107.6391986]},"properties":{"city":"Bandung","name":"XXX Skala","population":19955518}}
    console.log(newitem)
  }


}
