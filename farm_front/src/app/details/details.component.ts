import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FarmService } from '../services/farm.service'


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {  
  
  farm:any;

  constructor(private router:ActivatedRoute, private farmService:FarmService){}

  ngOnInit(){
    console.warn(this.router.snapshot.params.id)
    this.farmService.getCurrentFarm(this.router.snapshot.params.id).subscribe(result=>{
      this.farm = result;
      console.log(result)
    })
  }

  deletFarm(farmId){
    fetch("http://localhost:3000/farms/" + farmId, {
    method: 'Delete',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }})
  } 

}
