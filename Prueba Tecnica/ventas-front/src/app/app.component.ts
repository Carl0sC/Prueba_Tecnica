import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component'; // ajusta la ruta según tu proyecto

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, RouterModule, RouterOutlet],
  template: `
    <!-- Menú superior -->
    <app-menu></app-menu>

    <!-- Contenedor para las vistas -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
