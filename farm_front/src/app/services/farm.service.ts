import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Farm } from './../models/Farm';

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  constructor(private http: HttpClient){}

  farmurl="http://localhost:3000/farms";
  ownerurl="http://localhost:3000/owners";


  getFarm(){
    return this.http.get<any[]>(`${this.farmurl}`)
  }

  getCurrentFarm(id){
    return this.http.get(`${this.farmurl}/${id}`)
  }

  updateFarm(id,data){
      return this.http.get(`${this.farmurl}/${id}`,data)
  }

}
