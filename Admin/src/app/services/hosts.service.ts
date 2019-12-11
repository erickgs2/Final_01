import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL_GetHotelById = 'assets/data/hotel.json';
const URL_GetAllHab = 'assets/data/habitaciones.json';


@Injectable({
  providedIn: 'root'
})
export class HostsService {
  constructor(private http: HttpClient) { }

  // INFO HOTEL 
  getHotelById(id:any){
    return this.http.get(URL_GetHotelById);
  }
  // HABITACIONES
  getAllHab(hotelId:any){
    return this.http.get(URL_GetAllHab);
  }
  // RESERVAS
  getResByDay(date:any){
    //Date format: dd/mm/aaaa
    return this.http.get(URL_GetAllHab);
  }
  getResByWeek(strDate:any, endDate:any){
    //Date format: dd/mm/aaaa
    return this.http.get(URL_GetAllHab);
  }

}
