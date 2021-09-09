import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from './geolocation.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private map;

  constructor(
    public markerSrvc: MarkerService
  ) {}
  
  ngOnInit() {
    this.drawMap()
    this.markerSrvc.makeCapitalMarkers(this.map)
  }
  
  drawMap() {
    this.map = L.map('map', {
      center: [ -6.9473949,107.6391986 ],
      zoom: 12
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  getPinPoint(){
    this.map.on('click', (asd) => console.log(asd))
  }
}
