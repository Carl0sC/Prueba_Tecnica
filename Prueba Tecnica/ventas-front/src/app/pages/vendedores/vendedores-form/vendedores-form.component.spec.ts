import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedoresFormComponent } from './vendedores-form.component';

describe('VendedoresFormComponent', () => {
  let component: VendedoresFormComponent;
  let fixture: ComponentFixture<VendedoresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendedoresFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
