import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VendedoresService } from '../../../core/services/vendedores.service';
import { map, debounceTime, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-vendedores-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vendedores-form.component.html',
  styleUrls: ['./vendedores-form.component.scss']
})
export class VendedoresFormComponent implements OnInit {

  form!: FormGroup;
  id?: number;
  error = '';

  constructor(
    private fb: FormBuilder,
    private service: VendedoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', 
        [Validators.required, Validators.email],
        [this.correoUnicoValidator()]
      ]
    });

    if (this.id) {
      this.service.getById(this.id).subscribe(v => this.form.patchValue(v));
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const req = this.id
      ? this.service.update(this.id, this.form.value)
      : this.service.create(this.form.value);

    req.subscribe({
      next: () => this.router.navigate(['/vendedores']),
      error: err => this.error = err.error?.error || 'Error al guardar'
    });
  }

  // AsyncValidator para correo único
  correoUnicoValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return of(null);
      return of(control.value).pipe(
        debounceTime(500),
        switchMap(value => this.service.checkCorreo(value, this.id)),
        map(existe => (existe ? { correoExiste: true } : null))
      );
    };
  }
}
  