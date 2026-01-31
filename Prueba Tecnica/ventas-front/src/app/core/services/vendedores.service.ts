import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendedoresService {
private base = 'http://localhost:3000/vendedores'; // puerto donde corre tu backend

  constructor(private http: HttpClient) {}

  // Obtener todos los vendedores
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.base);
  }

  // Obtener por ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/${id}`);
  }

  // Crear vendedor
  create(vendedor: any): Observable<any> {
    return this.http.post<any>(this.base, vendedor);
  }

  // Actualizar vendedor
  update(id: number, vendedor: any): Observable<any> {
    return this.http.put<any>(`${this.base}/${id}`, vendedor);
  }

  // Eliminar físicamente
  remove(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }

  // Desactivar vendedor
  toggleActivo(id: number): Observable<any> {
    return this.http.patch(`${this.base}/${id}/desactivar`, {});
  }

  // Validar correo único
  checkCorreo(correo: string, id?: number): Observable<boolean> {
    const query = id ? `?id=${id}` : '';
    return this.http.get<boolean>(`${this.base}/check-correo/${correo}${query}`);
  }

  // Verificar si puede eliminar (sin ventas)
  puedeEliminar(id: number): Observable<{puedeEliminar: boolean}> {
    return this.http.get<{puedeEliminar: boolean}>(`${this.base}/${id}/puede-eliminar`);
  }
}
