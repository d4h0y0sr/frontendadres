import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  Adquisicion,
  AdquisicionService,
} from '../../services/adquisicion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'agregar-adquisicion-modal',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './agregar-adquisicion-modal.component.html',
  styleUrl: './agregar-adquisicion-modal.component.css',
})
export class AgregarAdquisicionModalComponent {
  @Output() adquisicionAgregada = new EventEmitter<void>(); // Evento para notificar que se agregó una adquisición
  @Input() adquisicionEditada: any = null;

  modoEdicion: boolean = false;

  // nuevaAdquisicion = this.limpiarAdquisicion(); // Objeto para almacenar los datos del formulario
  formulario: FormGroup;
  valoresOriginales: any = null;

  limpiarAdquisicion() {
    this.formulario.reset({
      id: 0,
      presupuesto: 0,
      unidad: '',
      tipoDeBien: '',
      cantidad: 0,
      valorUnitario: 0,
      valorTotal: 0,
      fechaAdquisicion: '',
      proveedor: '',
      documentacion: '',
      activo: true,
    });
  }


  constructor(
    private adquisicionService: AdquisicionService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      id: [0],
      presupuesto: ['', [Validators.required, Validators.min(0)]],
      unidad: ['', Validators.required],
      tipoDeBien: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      valorUnitario: ['', [Validators.required, Validators.min(0)]],
      valorTotal: ['', [Validators.required, Validators.min(0)]],
      fechaAdquisicion: ['', Validators.required],
      proveedor: ['', Validators.required],
      documentacion: ['', Validators.required],
      activo: [true],
    });
  }

  ngOnChanges(): void {
    if (this.adquisicionEditada) {
      this.modoEdicion = true;
      this.formulario.patchValue({
        ...this.adquisicionEditada,
        fechaAdquisicion:
          this.adquisicionEditada.fechaAdquisicion.split('T')[0],
      });
      this.valoresOriginales = { ...this.adquisicionEditada };
      this.calcularValorTotal();
    } else {
      this.modoEdicion = false;
      this.limpiarAdquisicion();
    }
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.formulario.invalid) {
      this.marcarCamposComoSucios();
      return;
    }

    const adquisicion = this.formulario.value;

    if (this.modoEdicion) {
      this.adquisicionService.editarAdquisicion(adquisicion).subscribe({
        next: () => {
          this.adquisicionAgregada.emit();
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al editar la adquisición:', error);
        },
      });
    } else {
      this.adquisicionService.agregarAdquisicion(adquisicion).subscribe({
        next: () => {
          this.adquisicionAgregada.emit(); // Notificar que se agregó una adquisición
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al agregar la adquisición:', error);
        },
      });
    }
  }

  // Método para marcar todos los campos como "touched" (sucios)
  marcarCamposComoSucios(): void {
    Object.values(this.formulario.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  // Método para cerrar el modal

    cerrarModal(): void {
      if (!this.modoEdicion) {
        this.limpiarAdquisicion();
        this.adquisicionEditada = null;
        this.modoEdicion = false;
      }

      const modal = document.getElementById('agregarAdquisicionModal');
      if (modal) {
        modal.style.display = 'none'; // Ocultar el modal
      }
    }

  calcularValorTotal(): void {
    const cantidad = this.formulario.get('cantidad')?.value;
    const valorUnitario = this.formulario.get('valorUnitario')?.value;
    const valorTotal = cantidad * valorUnitario;
    this.formulario.get('valorTotal')?.setValue(valorTotal);
  }
}
