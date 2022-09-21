import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  Category } from '../action-category/category';
import { SubActionCategory } from './sub-action-category';

const httpoptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SubActionCategoryService {
  baseAPI = environment.baseURL;
  constructor(private _http:HttpClient) {}

  AddSubCategoryService(subActionCategory:SubActionCategory){
    return this._http.post<SubActionCategory>(
      this.baseAPI+'/sub-categories', subActionCategory, httpoptions
    )
  }

  getCategoryBySubCategoryService(id: string) {
    return this._http.get<SubActionCategory>(`${this.baseAPI}/categories/${id}/sub-categories`);
  }

  getAllCategoriesService(): Observable<Category[]> {
    return this._http.get<Category[]>(this.baseAPI+'/categories', httpoptions)
  }

}


