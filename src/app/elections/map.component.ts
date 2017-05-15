import { Component, OnInit } from '@angular/core';
import { Router }                 from '@angular/router';
import { VoivodeshipsResponse } from '../_models/index';
import { MapService } from '../_services/map.service';

@Component({
  selector: 'maps',
  moduleId: module.id,
  templateUrl: './map.component.html',
  providers: [ MapService ]
})


export class MapComponent implements OnInit {

  constructor(private mapService: MapService, private router: Router) { }

  setUpMap(map_data: VoivodeshipsResponse, router: Router) {

    let region_id = {};

    let google = require('./../../js/map_loader.js');

    function drawRegionsMap() {
      let d: (string | number)[][] = [['Provinces', 'tooltip', 'Głosów']];
      for (let v of map_data.voivodeships) {
        d.push([v.name, v.name, v.votes]);
        region_id['PL-' + v.code.toUpperCase()] = v.id;
      }

      let data = google.visualization.arrayToDataTable(d);

      let options = {
        resolution: 'provinces',
        region: 'PL',
        datalessRegionColor: '#123456',
        colorAxis: {colors: ['#fff0ef', '#ea3023']}
      };

      let chart = new google.visualization.GeoChart(document.getElementById('map'));

      chart.draw(data, options);

      google.visualization.events.addListener(chart, 'regionClick', (event: {region: string}) => {
        router.navigateByUrl('/voivodeship/' + region_id[event.region]);
      });
    }

    google.charts.load('current', {
      'packages': ['geochart']
    });

    google.charts.setOnLoadCallback(drawRegionsMap);

    window.onload = function() {
      drawRegionsMap();
    };

    window.onresize = function () {
      drawRegionsMap();
    };
  }

  generateMapData(done: (map_data: VoivodeshipsResponse, router: Router) => void, router: Router) {
    this.mapService.get_voivodeships()
      .then((response: VoivodeshipsResponse) => {
        let last = JSON.parse(localStorage.getItem('mapData')) as VoivodeshipsResponse;
        localStorage.setItem('mapData', JSON.stringify(response));
        if (JSON.stringify(last) !== JSON.stringify(response)) {
          done(response, router);
        }
      }).catch((err: {message: string}) => {
        console.error('Mapa: ' + err.message);
      });
  }

  ngOnInit() {
    let response = JSON.parse(localStorage.getItem('mapData')) as VoivodeshipsResponse;
    if (response !== null) {
      this.setUpMap(response, this.router);
    }
    this.generateMapData(this.setUpMap, this.router);
  }
}
