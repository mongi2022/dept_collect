import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facture } from './facture';
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
export class FacturesService {
  baseApi=environment.baseURL
 

  constructor(private http:HttpClient) { }
    

  createFacturesService(facture:Facture): Observable<Facture> {
    return this.http.post<Facture>(this.baseApi + '/facture', facture,httpoptions)
    
  }
  getAllFacturesService(): Observable<Facture[]>{
  return  this.http.get<Facture[]>(this.baseApi+'/facture')
  }

  deleteFacturesService(id:string):Observable<Facture>{
    return this.http.delete<Facture>(`${this.baseApi}/facture/${id}`)
  }
  updateFacturesService(id:string, params: any):Observable<any>{
    return this.http.patch<Facture>(`${this.baseApi}/factures/${id}`,params)
  }

  getAllTeamsService(facture:string):Observable<any>{
    
    return this.http.post<any>('http://localhost:3000/factures/',facture,httpoptions)
   }

   getAllFacturesClientService(client:string):Observable<Facture>{
    
    return this.http.post<Facture>('http://localhost:3000/facture/client',{client},httpoptions)
   }
}