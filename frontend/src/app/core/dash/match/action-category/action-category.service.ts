import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from './category';

const httpoptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ActionCategoryService {
  baseAPI = environment.baseURL;
  id!:any;

  constructor(private _http: HttpClient) {}

  AddCategoryService(category: Category): Observable<Category> {
    return this._http.post<Category>(
      this.baseAPI + '/categories',
      category,
      httpoptions
    );
  }
}
