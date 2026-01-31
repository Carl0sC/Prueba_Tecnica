import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../../models/producto';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private api = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Producto[]>(this.api);
  }

  getById(id: number) {
    return this.http.get<Producto>(`${this.api}/${id}`);
  }

  create(data: Producto) {
    return this.http.post(this.api, data);
  }

  update(id: number, data: Producto) {
    return this.http.put(`${this.api}/${id}`, data);
  }
  remove(id: number) {
  return this.http.delete(`${this.api}/${id}`);
}

}
