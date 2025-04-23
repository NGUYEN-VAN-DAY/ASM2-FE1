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
  [x: string]: any;
  constructor(protected _http: HttpClient) {
    super(_http);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  // Lấy danh sách tất cả danh mục
  getCategories(): Observable<ICategory[]> {
    const url = API_ENDPOINT.category.base + API_ENDPOINT.category.list;
    return this._http.get<ICategory[]>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  // Lấy chi tiết danh mục theo ID
  getCategoryById(id: string | number): Observable<ICategory> {
    const url = `${API_ENDPOINT.category.base}/${id}`;
    return this._http.get<ICategory>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  // Thêm danh mục mới
  addCategories(data: any): Observable<ICategory[]> {
    const url = API_ENDPOINT.category.base + API_ENDPOINT.category.add;
    return this._http.post<ICategory[]>(url, data, {
      headers: this.getAuthHeaders(),
    });
  }

  // Cập nhật danh mục theo ID
  updateCategory(id: string | number, data: any): Observable<ICategory> {
    const url = `${API_ENDPOINT.category.base}/${id}`;
    console.log("Service data: ", data);  // Kiểm tra dữ liệu cập nhật
    
    return this._http.put<ICategory>(url, data, {
      headers: this.getAuthHeaders(),
    });
  }

  // Xóa danh mục theo ID
  deleteCategory(id: number): Observable<any> {
    const url = `${API_ENDPOINT.category.base}/${id}`;
    return this._http.delete(url, {
      headers: this.getAuthHeaders(),
    });
  }
}
