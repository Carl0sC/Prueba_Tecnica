import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../../core/services/productos.service';
@Component({
  selector: 'app-productos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productos-form.component.html',
   styleUrls: ['./productos-form.component.scss']
})
export class ProductosFormComponent implements OnInit {

  form!: FormGroup;
  productoId?: number;

  constructor(
    private fb: FormBuilder,
    private service: ProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, Validators.required],
      stock: [0, Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoId = +id;
      this.service.getById(this.productoId).subscribe(p => {
        this.form.patchValue(p);
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const data = this.form.value;

    (!this.productoId
      ? this.service.create(data)
      : this.service.update(this.productoId, data)
    ).subscribe(() => this.router.navigate(['/productos']));
  }
}
