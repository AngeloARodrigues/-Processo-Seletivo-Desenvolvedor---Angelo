import { Component,} from '@angular/core';
import { DrawAddon } from '@common/draw';
import GeoJSON from 'ol/format/GeoJSON';
import { MapService } from '../map.service';
import { BasemapComponent } from '../basemap/basemap.component';
import { GeoJsonFeatureAddon } from '@common/feature';
import { pointClickStyle, GeoJsonFeature } from '@common/geolib'
import { Owner } from '../models/Owner';
import { Farm } from '../models/Farm';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']})

export class FormComponent {

  circleDrawn = false;

  owner: Owner = {
    id: '000.000.000-0',
    name: '',
    document: '000.000.000-0',
    document_type: 'CPF' ,
  }

  farm: Farm = {
    id: Date.now(),
    name: '',
    geomtry: '',
    area: 0,
    centroid: [],
    owner_id: "",
  }

  farmOBJ = {
    id:Date.now(),
      name: this.farm.name,
      geometry: {
        type: "Polygon",
        coordinates: this.farm.geomtry
      },
      area: this.farm.area,
      centroid: this.farm.centroid,
      owner_id: this.owner.id
  }

  submitted = false;

  onSubmitbtm() { 
    this.submitted = true; console.log(this.farm);
  
    fetch("http://localhost:3000/farms", {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.farm)

    }); 

    fetch("http://localhost:3000/owners", {
      
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.owner)
  
      }); 

  }

    private _map!: BasemapComponent;
    private _geometries: GeoJsonFeature[] = [];
  
    constructor(private _mapService: MapService) { }; 

    ngOnInit() {
      this._map = this._mapService.map;
    }
  
    draw(type: 'Circle') {
      if(!this._map) return;
      this._map.includeAddon(new DrawAddon({
        identifier: 'geometry_map',
        drawType: type,
        callback: geometry => {
            const geo = new GeoJSON().writeGeometryObject(geometry) as any
            this.handleNewGeometry(geo)
          }
        }))
    }
  
    geometrySeed: number = 1
    handleNewGeometry(geometry: any) {
      const identifier = this.geometrySeed++
      this._map.includeAddon(
        new GeoJsonFeatureAddon({
          identifier: `geometry::${identifier}`,
          feature: geometry,
          styleFunction: () => {
            return pointClickStyle({
              hover: false,
              strokeColor: '#1962D1',
            })
          },
        })
      )
      this._map.fitToAddons(this._map.listByPrefix('geometry'))
      console.log('New geometry', geometry)
      this._geometries.push(geometry)
      this.farm.geomtry = geometry.coordinates[0];
      this.farm.centroid = [geometry.coordinates[0][24][0],geometry.coordinates[0][16][1]];
      if (this.farm.geomtry !== ''){
        this.circleDrawn = true;
      }
    }  
  
    ngOnDestroy() {
      this._map.removeByPrefix('geometry')
    }
}