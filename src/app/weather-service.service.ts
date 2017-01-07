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
  state_radar: string
  city_radar: string
  url: string
  constructor(private http: Http){}
    getExtended(city:string, state:string) : Observable<any>{
  return this.http.get("http://api.wunderground.com/api/d98fd4d494c04eae/forecast/q/" + state + "/" + city + ".json")
                           .map((res:Response) => {
                             this.extendedData = res.json()
                             return this.extendedData;
                           })
  }
    pullWeather() : Observable<any> {
      // Get data from API and render back to component
   return this.http.get("http://api.wunderground.com/api/d98fd4d494c04eae/geolookup/conditions/q/autoip.json")
                         .map((res:Response) => {
                           this.weatherData = res.json()
                           console.log(this.weatherData)
                           let state = res.json().location.state;
                           let city = res.json().location.city
                           return this.weatherData;
                          })
   }
    pullRadar() : Observable<any>{
        // construct url from city and state
        return this.http.get("http://api.wunderground.com/api/d98fd4d494c04eae/geolookup/conditions/q/autoip.json")
                         .map((res:Response) => {
                           this.weatherData = res.json()
                           this.state_radar = res.json().location.state;
                           this.city_radar = res.json().location.city
                            console.log(this.state_radar,this.city_radar)
                            return this.url = "http://api.wunderground.com/api/d98fd4d494c04eae/animatedradar/q/" + this.state_radar + "/" + this.city_radar + ".gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50";
                           //return url;
                          })
                         
   }
}



