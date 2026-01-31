import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../../models/venta';

@Injectable({ providedIn: 'root' })
export class VentasService {
  private api = 'http://localhost:3000/ventas';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Venta[]>(this.api);
  }

  create(data: Venta) {
    return this.http.post<Venta>(this.api, data);
  }

  remove(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
