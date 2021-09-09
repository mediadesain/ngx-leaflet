import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  constructor() { }

  makeCapitalPopup(data: any) {
    return `` +
    `<div>Capital: ${ data.name }</div>` +
    `<div>State: ${ data.city }</div>` +
    `<div>Population: ${ data.population }</div>`
  }

}