import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../match/team';
import { Player } from './player';
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
export class PlayerService {
  baseAPI=environment.baseURL
  constructor(private _http:HttpClient) { }

  AddPlayerService(player:Player):Observable<Player>{
    return  this._http.post<Player>(this.baseAPI+'/player',player,httpoptions)
    }

   getPlayerByTeamService(id:string):Observable<Player>{
  
    
    return this._http.get<Player>(`${this.baseAPI}/team/${id}/players`)
   }

   
   getAllPlayersService():Observable<Player[]>{
    return this._http.get<Player[]>(`${this.baseAPI}/player`)

   }
  
}
