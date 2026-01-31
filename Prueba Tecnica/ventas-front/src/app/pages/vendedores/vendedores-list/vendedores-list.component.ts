import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VendedoresService } from '../../../core/services/vendedores.service';


@Component({
  selector: 'app-vendedores-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './vendedores-list.component.html',
  styleUrls: ['./vendedores-list.component.scss']
})
export class VendedoresListComponent implements OnInit {

  vendedores: any[] = [];
  error = '';

  constructor(
    private service: VendedoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.service.getAll().subscribe({
      next: data => this.vendedores = data,
      error: err => this.error = 'Error cargando vendedores'
    });
  }

  nuevo() {
    this.router.navigate(['/vendedores/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/vendedores/editar', id]);
  }

  eliminar(id: number) {
    if (!confirm('¿Desea desactivar este vendedor?')) return;
    this.service.toggleActivo(id).subscribe({
      next: () => this.cargar(),
      error: err => this.error = 'Error al desactivar vendedor'
    });
  }
}
