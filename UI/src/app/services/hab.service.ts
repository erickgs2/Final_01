import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Habitacion } from 'app/models/habitacion';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class HabService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Habitacion[]>(`${environment.apiUrl}/habitaciones`);
    }

    getById(id: string) {
        return this.http.post<Habitacion>
        (`https://flashp.azurewebsites.net/api/habitaciones/byId`, { id });
    }
}
