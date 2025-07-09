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
export class MapService {
  newDropMarkerLatLng: {lat?: number,lng?: number} = {};
  newmarker: any = null;
  
  private map: L.Map | undefined;
  private markers: any[] = []
  private selectedMarker: any = null;

  constructor() {}
    
  drawMap(latLang: L.LatLngExpression = [ -6.9008564858180526, 107.61211395263673 ]) {
    //https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.map = L.map('map', {
      center: latLang,
      zoom: 13,
      layers: [tiles]
    });
    tiles.addTo(this.map);
  }

  setMarkerData(data: any[]){
    this.markers = data;
  }

  getSelectedMarker(): any{
    return this.selectedMarker;
  }

  selectViewPoint(latLang: L.LatLngExpression){
    // remove existing
    if (this.map != null) this.map.remove();
    // redraw with position
    this.drawMap(latLang);
    this.loadMarkers();
    this.dropMarker();
  }

  dropMarker(){
    this.map?.on('click', (e:any) => {
      console.log('Pin Point',e)
      if (this.newmarker !== null) this.map?.removeLayer(this.newmarker)
      this.newDropMarkerLatLng = {"lat": e.latlng.lat,"lng": e.latlng.lng};
      const marker = new L.Marker([e.latlng.lat,e.latlng.lng]);
      if (this.map) {
        this.newmarker = marker.addTo(this.map)
      }
      // this.newmarker = this.map && new L.Marker([e.latlng.lat,e.latlng.lng]).addTo(this.map)
    });
  }

  addAreaRadius() {
    const radius = L.circle([-6.922283981455153, 107.59632110595705], {
      radius: 800,
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.1
    })
    if (this.map) radius.addTo(this.map)
  }

  loadMarkers() {
    this.markers.forEach( element => {
        const marker = L.marker([element.coordinates.lat, element.coordinates.lng]);
        marker.bindPopup(this.makeCapitalPopup(element))
        if (this.map) marker.addTo(this.map);
        marker.on('click', () => this.selectedMarker = element )
    });
  }

  resetSelected(): void{
    this.selectedMarker = null;
    this.newDropMarkerLatLng = {};
    this.newmarker = null;
  }

  makeCapitalPopup(data: any) {
    return `
      <div>Capital: ${ data.name }</div>
      <div>State: ${ data.city }</div>
      <div>Phone No: ${ data.phoneNo }</div>
    `;
  }

}

