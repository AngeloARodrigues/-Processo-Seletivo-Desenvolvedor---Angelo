import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FarmService } from '../services/farm.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit{ 

  farm: Array<any>
  farms:any;
  owners: any;
  

  constructor(private http:HttpClient, private farmService: FarmService){
    this.http.get("http://localhost:3000/farms").toPromise().then(
      data=>{
        this.farms = data
      }
    )
    this.http.get("http://localhost:3000/farms").toPromise().then(
      data=>{
        this.owners = data
      }
    )
  } 

  ngOnInit(){
    this.getFarm();  
  }


  getFarm(){
    this.farmService.getFarm()
    .subscribe(dados => {this.farm = dados 
    console.log(dados)});
    
  }
}


