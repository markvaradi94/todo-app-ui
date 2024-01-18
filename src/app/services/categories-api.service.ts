import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryModel} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {
  url = 'http://localhost:8080/categories';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  addCategory(category: CategoryModel): Observable<any> {
    return this.httpClient.post(this.url, category);
  }
}
