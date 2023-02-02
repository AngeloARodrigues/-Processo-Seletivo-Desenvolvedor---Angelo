import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FarmService } from '../services/farm.service'
import { Farm } from '../models/Farm';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

    farm: Farm = {
    name: '',
    geomtry: '',
    area: 0,
    centroid: [],
    owner_id: "",
  }

  farmOBJ = {
      name: this.farm.name,
      geometry: {
        type: "Polygon",
        coordinates: this.farm.geomtry
      },
      area: this.farm.area,
      centroid: this.farm.centroid,
  
  }
  


  constructor(private router:ActivatedRoute, private farmService:FarmService){}

  editFarm = new FormGroup({
    owner_id: new FormControl(""),
    name: new FormControl(""),
    area: new FormControl("")
  })

  ngOnInit(){    
    this.farmService.getCurrentFarm(this.router.snapshot.params.id).subscribe(result=>{
      this.farmOBJ = result;
      console.log('result',result)
    })
  }

  onSubmitbtm(){  
    this.farmService.updateFarm(this.router.snapshot.params.id,this.farmOBJ.value).subscribe(result =>{
      this.farmOBJ= result;
    }) 
  }



}
