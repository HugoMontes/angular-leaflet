import { Component, OnInit } from '@angular/core';

// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

declare let L;
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'angular-leaflet';

  constructor() { }

  ngOnInit() {
      const map = L.map('map').setView([-17.501319, -65.066962], 6);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const myMarker = L.marker([-17.501319, -65.066962], {title: 'MyPoint', alt: 'The Big I', draggable: true})
      .addTo(map).on('dragend', function() {
        const coord = String(myMarker.getLatLng()).split(',');
        console.log(coord);
        const lat = coord[0].split('(');
        console.log(lat);
        const lng = coord[1].split(')');
        console.log(lng);
        myMarker.bindPopup('Moved to: ' + lat[1] + ', ' + lng[0] + '.');
      });
  }
}
