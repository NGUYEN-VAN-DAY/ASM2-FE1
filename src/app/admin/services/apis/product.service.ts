import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../interface/category.interface';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
import { IProduct } from '../../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class productService extends ApiService {
  [x: string]: any;

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

  getProducts(): Observable<IProduct[]> {
    const url = API_ENDPOINT.product.base + API_ENDPOINT.product.list;
    return this._http.get<IProduct[]>(url, {
      headers: this.getAuthHeaders(),
      // withCredentials: true  // nếu dùng session-based
    });
  }
  updateProduct(id: string | number, data: any): Observable<IProduct> {
    const url = `${API_ENDPOINT.product.base}/${id}`;
    console.log("Service data: ", data);  // Kiểm tra dữ liệu cập nhật
    
    return this._http.put<IProduct>(url, data, {
      headers: this.getAuthHeaders(),
    });
  }
  getProductById(id: string | number): Observable<IProduct> {
    const url = `${API_ENDPOINT.product.base}/${id}`;
    return this._http.get<IProduct>(url, {
      headers: this.getAuthHeaders(),
    });
  }
  addProducts(data: any): Observable<IProduct[]> {
    const url = API_ENDPOINT.product.base + API_ENDPOINT.product.add;
    return this._http.post<IProduct[]>(url, data, {
      headers: this.getAuthHeaders(),
      // withCredentials: true
    });
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${API_ENDPOINT.product.base}/${id}`;
    return this._http.delete(url, {
      headers: this.getAuthHeaders(),
      // withCredentials: true
    });
  }
}
