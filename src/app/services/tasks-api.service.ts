import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import {TaskModel} from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {
  url = 'http://localhost:8080/tasks';

  constructor(private httpClient: HttpClient) { }

  getAll(filters?: any): Observable<any> {
    let queryParams = new HttpParams({ fromObject: filters });
    return this.httpClient.get(this.url, { params: queryParams });
  }

  updateTask(id: number, requestBody: TaskModel): Observable<any> {
    return this.httpClient.put(this.url + '/' + id, requestBody);
  }

  deleteTask(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  addTask(task: TaskModel): Observable<any> {
    return this.httpClient.post(this.url, task);
  }
}
