import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- solo CommonModule
import { ProductosService } from '../../../core/services/productos.service';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule] // <-- no CurrencyPipe aquí
})
export class ProductosListComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private service: ProductosService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.service.getAll().subscribe(data => this.productos = data);
  }

  eliminar(id: number) {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    this.service.remove(id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== id);
      },
      error: (err: any) => console.error('Error al eliminar', err)
    });
  }
}

}



