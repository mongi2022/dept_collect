import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facture } from '../../facture/facture';
import { Client } from './client';
const httpoptions = {
  headers: new HttpHeaders
    (
      {
        'Content-Type': 'application/json'

      })
}
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  baseApi=environment.baseURL


  constructor(private http:HttpClient) { }


  createClientsService(client:Client): Observable<Client> {
    return this.http.post<Client>(this.baseApi + '/client', client,httpoptions)

  }
  getAllClientsService(): Observable<Client[]>{
  return  this.http.get<Client[]>(this.baseApi+'/client')
  }
  getClientByIdService(id:string): Observable<Client[]>{
    return  this.http.get<Client[]>(`${this.baseApi}/client/${id}`)
    }
  deleteClientsService(id:string):Observable<Client>{
    return this.http.delete<Client>(`${this.baseApi}/client/${id}`)
  }
  updateClientsService(id:string, params: any):Observable<any>{
    return this.http.patch<Client>(`${this.baseApi}/client/${id}`,params)
  }


}
