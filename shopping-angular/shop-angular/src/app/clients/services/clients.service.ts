import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Client[]>{
    return this.httpClient.get<Client[]>('http://localhost:8080/clients');
  }

  saveClient(client: Client): Observable<Client>{
    return this.httpClient.post<Client>('http://localhost:8080/client', client);
  }
  
  disableClient(id: number): Observable<any> {
    const url =  'http://localhost:8080/client/disable/' + id
    return this.httpClient.put(url,null);
  }

  activateClient(id: number): Observable<any> {
    const url =  'http://localhost:8080/client/activate/' + id
    return this.httpClient.put(url,null);
  }

  getClientById(id: number): Observable<Client>{
    return this.httpClient.get('http://localhost:8080/clients/' + id).pipe(
      map((data: any) => {
        // Transforme os dados para o tipo 'Client'
        return {
          id: data.id || null,
          name: data.name || '',
          email: data.email || '',
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null
        } as Client;
      })
    );
  }

}
