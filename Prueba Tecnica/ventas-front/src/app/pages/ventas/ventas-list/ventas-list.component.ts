import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VentasService } from '../../../core/services/ventas.service';
import { Venta } from '../../../models/venta';

@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class VentasListComponent implements OnInit {
  ventas: Venta[] = [];
  error: string = '';

  constructor(private ventasService: VentasService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.ventasService.getAll().subscribe({
      next: data => this.ventas = data,
      error: err => this.error = 'Error al cargar las ventas'
    });
  }

  eliminarVenta(id?: number) {
    if (!id) return; // evita errores si id es undefined

    if (confirm('¿Seguro que quieres eliminar esta venta?')) {
      this.ventasService.remove(id).subscribe({
        next: () => {
          this.ventas = this.ventas.filter(v => v.id !== id);
        },
        error: (err: any) => console.error('Error al eliminar', err)
      });
    }
  }
}
