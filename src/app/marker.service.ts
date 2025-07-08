import { Injectable } from '@angular/core';
import * as L from 'leaflet';

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

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
    map:any;
    selected:any = null;
    newmarker:any = null;
    selectNewmarker: {lat?: number,lng?: number} = {};

    constructor() {}
    
    drawMap() {
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      this.map = L.map('map', {
        center: [ -6.9473949,107.6391986 ],
        zoom: 12,
        layers: [tiles]
      });
      tiles.addTo(this.map);
    }

    dropMarker(){
      this.map.on('click', (e:any) => {
        // console.log('Pin Point',e)
        if (this.newmarker !== null) this.map.removeLayer(this.newmarker)
        this.selectNewmarker ={"lat": e.latlng.lat,"lng": e.latlng.lng}
        this.newmarker = new L.Marker([e.latlng.lat,e.latlng.lng]).addTo(this.map)
      });
    }

    loadMarkers(map: L.Map, markers: any[]) {
      console.log(markers)
      markers.forEach( element => {
          const marker = L.marker([element.coordinates.lat, element.coordinates.lng]);
          marker.addTo(map);
          marker.on('click', () => this.selected = element )
      });
    }

  

}

