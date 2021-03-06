import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchModel } from 'app/models/busqueda';

//const URL_PRODUCTS='/api/habitaciones'
const URL_PRODUCTS = 'https://flashp.azurewebsites.net/api/habitaciones';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(URL_PRODUCTS);
  }

  getBySearch(searching: string){
    return new Observable(observer => {
      this.getAll().subscribe((data:SearchModel[]) => {
        const filter = data.filter(item => item.ciudad.toLowerCase() == searching.toLowerCase() || item.ciudad.toLowerCase().includes(searching) || item.des.toLowerCase().includes(searching));
        observer.next(filter);
        
      });
    });
  }
}
