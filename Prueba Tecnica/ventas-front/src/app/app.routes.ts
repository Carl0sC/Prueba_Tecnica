import { Routes } from '@angular/router';
import { VendedoresListComponent } from './pages/vendedores/vendedores-list/vendedores-list.component';
import { VendedoresFormComponent } from './pages/vendedores/vendedores-form/vendedores-form.component';
import { ProductosListComponent } from './pages/productos/productos-list/productos-list.component';
import { ProductosFormComponent } from './pages/productos/productos-form/productos-form.component';
import { VentasListComponent } from './pages/ventas/ventas-list/ventas-list.component';
import { VentasFormComponent } from './pages/ventas/ventas-form/ventas-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'vendedores', pathMatch: 'full' },

  { path: 'vendedores', component: VendedoresListComponent },
  { path: 'vendedores/nuevo', component: VendedoresFormComponent },
  { path: 'vendedores/editar/:id', component: VendedoresFormComponent },

  { path: 'productos', component: ProductosListComponent },
  { path: 'productos/nuevo', component: ProductosFormComponent },
  { path: 'productos/editar/:id', component: ProductosFormComponent },

  { path: 'ventas', component: VentasListComponent },
  { path: 'ventas/nuevo', component: VentasFormComponent }
];
