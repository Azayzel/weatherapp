import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';
import { Observable } from 'rxjs';
//import { Weather } from './weather';

import 'rxjs/Rx'



@Injectable()
export class WeatherServiceService {
  weatherData = [];
  extendedData = [];
  radarData = [];
  constructor(private http: Http) {
  }
    getExtended(city:string, state:string) : Observable<any>{
  return this.http.get("http://api.wunderground.com/api/d98fd4d494c04eae/forecast/q/" + state + "/" + city + ".json")
                           .map((res:Response) => {
                             this.extendedData = res.json()
                             return this.extendedData;
                           })
  }
    pullWeather() : Observable<any> {
   return this.http.get("http://api.wunderground.com/api/d98fd4d494c04eae/geolookup/conditions/q/autoip.json")
                         .map((res:Response) => {
                           this.weatherData = res.json()
                           let state = res.json().location.state;
                           let city = res.json().location.city
                           return this.weatherData;
                          })
   }
      pullRadar(city:string,state:string) : Observable<any> {
        console.log(city,state)
        let url = "http://api.wunderground.com/api/d98fd4d494c04eae/satellite/q/" + state + "/" + city + ".json"
   return this.http.get(url)
                         .map((res:Response) => {
                           this.radarData = res.json()
                           return this.radarData;
                          })
   }
}



