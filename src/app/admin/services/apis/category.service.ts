import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../interface/category.interface';
import { API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {

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

  getCategories(): Observable<ICategory[]> {
    const url = API_ENDPOINT.category.base + API_ENDPOINT.category.list;
    return this._http.get<ICategory[]>(url, {
      headers: this.getAuthHeaders(),
      // withCredentials: true  // nếu dùng session-based
    });
  }

  addCategories(data: any): Observable<ICategory[]> {
    const url = API_ENDPOINT.category.base + API_ENDPOINT.category.add;
    return this._http.post<ICategory[]>(url, data, {
      headers: this.getAuthHeaders(),
      // withCredentials: true
    });
  }

  deleteCategory(id: number): Observable<any> {
    const url = `${API_ENDPOINT.category.base}/${id}`;
    return this._http.delete(url, {
      headers: this.getAuthHeaders(),
      // withCredentials: true
    });
  }
}
