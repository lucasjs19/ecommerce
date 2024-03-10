import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manufacturer } from '../model/manufacturer';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Manufacturer[]>{
    return this.httpClient.get<Manufacturer[]>('http://localhost:8080/manufacturer');
  }

  saveManufacturer(manufacturer: Manufacturer): Observable<Manufacturer>{
    return this.httpClient.post<Manufacturer>('http://localhost:8080/manufacturer', manufacturer);
  }
  
  disableManufacturer(id: number): Observable<any> {
    const url =  'http://localhost:8080/manufacturer/disable/' + id
    return this.httpClient.put(url,null);
  }

  activateManufacturer(id: number): Observable<any> {
    const url =  'http://localhost:8080/manufacturer/activate/' + id
    return this.httpClient.put(url,null);
  }

  getManufacturerById(id: number): Observable<Manufacturer>{
    return this.httpClient.get('http://localhost:8080/manufacturer/' + id).pipe(
      map((data: any) => {
        // Transforme os dados para o tipo 'Client'
        return {
          id: data.id || null,
          name: data.name || '',
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null,
          active: data.active || false
        } as Manufacturer;
      })
    );
  }
}
