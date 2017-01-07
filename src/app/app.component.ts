import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { WeatherServiceService } from './weather-service.service';
//import { Weather } from './weather';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
city: string
state: string
radarUrl: string
// this does not work
/* 
  location: Object
  current_observation: Object
*/

// this works
weatherAll = new Array;
  location = new Object;
  extendedData = new Array;
  current_observation = new Object;
  title = 'ngWeather by Josh Lavely';
  constructor(private weatherService: WeatherServiceService){
  }

  ngOnInit(){
    // get weather on Init
    this.weatherService.pullWeather()
                          .subscribe(
                            data => { 
                              // Assign data
                              console.log(data)
                              this.city = data.location.city;
                              this.state = data.location.state;
                              this.current_observation = data.current_observation;
                              this.location = data.location;
                           },
                            err => console.error(err),
                            () => this.weatherService.getExtended(this.city, this.state)
                                                      .subscribe(data => {
                                                        this.extendedData = data.forecast.txt_forecast.forecastday;
                                                        console.log(this.extendedData)
                                                      })                          );
                          
  }

  pullRadar(){
     this.weatherService.pullRadar(this.city,this.state)
                          .subscribe(
                            data => { 
                              // Assign data
                              console.log(data)
                              this.radarUrl = data.satellite.image_url_vis
                           },
                            err => console.error(err),
                            () => console.log("done")
                          );
  }
}
