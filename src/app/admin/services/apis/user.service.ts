import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../interface/category.interface';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
import { IUser } from '../../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class userService extends ApiService {

  constructor(
    protected _http: HttpClient,
  ) {
    super(_http);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  getUser(): Observable<IUser[]> {
    const url = API_ENDPOINT.user.base + API_ENDPOINT.user.list;
    return this._http.get<IUser[]>(url, {
      headers: this.getAuthHeaders(),
      // withCredentials: true  // nếu dùng session-based
    });
  }

  addUser(data: any): Observable<IUser[]> {
    const url = API_ENDPOINT.user.base + API_ENDPOINT.user.add;
    return this._http.post<IUser[]>(url, data, {
      headers: this.getAuthHeaders(),
      // withCredentials: true
    });
  }

  // deleteCategory(id: number): Observable<any> {
  //   const url = `${API_ENDPOINT.category.base}/${id}`;
  //   return this._http.delete(url, {
  //     headers: this.getAuthHeaders(),
  //     // withCredentials: true
  //   });
  // }
}
