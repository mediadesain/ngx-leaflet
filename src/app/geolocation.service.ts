import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
    selected:any;

    constructor() { }
    

    makeCapitalMarkers(map: L.Map) {
        const capitals:any = [
            {"type":"Feature","geometry":{"type":"Point","coordinates":[-6.8816662,107.6377027]},"properties":{"city":"Bandung","name":"The Common Place Skala","population":199518}},
            {"type":"Feature","geometry":{"type":"Point","coordinates":[-6.8876484,107.6236724]},"properties":{"city":"Bandung","name":"Cafe Tangga","population":32094}},
            {"type":"Feature","geometry":{"type":"Point","coordinates":[-112.073844,33.448457]},"properties":{"city":"Bandung","name":"Phoenix","population":1626078}}
        ]
        capitals.forEach( element => {
            const marker = L.marker(element.geometry.coordinates);
            marker.addTo(map);
            marker.on('click', () => this.selected = element )
        });
    }

  

}

