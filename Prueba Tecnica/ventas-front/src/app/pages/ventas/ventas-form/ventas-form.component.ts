import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { VentasService } from '../../../core/services/ventas.service';
import { ProductosService } from '../../../core/services/productos.service';
import { VendedoresService } from '../../../core/services/vendedores.service';

@Component({
  selector: 'app-ventas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ventas-form.component.html',
  styleUrls: ['./ventas-form.component.scss']
})
export class VentasFormComponent implements OnInit {

  form!: FormGroup;
  error = '';

  productos: any[] = [];
  vendedores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ventasService: VentasService,
    private productosService: ProductosService,
    private vendedoresService: VendedoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      producto_id: [null, Validators.required],
      vendedor_id: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });

    this.cargarProductos();
    this.cargarVendedores();
  }

  cargarProductos() {
    this.productosService.getAll().subscribe({
      next: data => this.productos = data,
      error: err => this.error = 'Error cargando productos'
    });
  }

  cargarVendedores() {
    this.vendedoresService.getAll().subscribe({
      next: data => this.vendedores = data,
      error: err => this.error = 'Error cargando vendedores'
    });
  }

  guardar() {
    if (this.form.invalid) return;

    this.ventasService.create(this.form.value).subscribe({
      next: () => this.router.navigate(['/ventas']),
      error: err => this.error = err.error?.error || 'Error al registrar venta'
    });
  }
}
