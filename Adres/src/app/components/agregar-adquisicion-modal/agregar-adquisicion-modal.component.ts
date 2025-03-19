import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Adquisicion,
  AdquisicionService,
} from '../../services/adquisicion.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'agregar-adquisicion-modal',
  imports: [FormsModule],
  templateUrl: './agregar-adquisicion-modal.component.html',
  styleUrl: './agregar-adquisicion-modal.component.css',
})
export class AgregarAdquisicionModalComponent {
  @Output() adquisicionAgregada = new EventEmitter<void>(); // Evento para notificar que se agregó una adquisición
  @Input() adquisicionEditada: any = null;

  modoEdicion: boolean = false;

  nuevaAdquisicion = this.limpiarAdquisicion(); // Objeto para almacenar los datos del formulario
  valoresOriginales: any = null;

  limpiarAdquisicion(): Adquisicion {
    return {
      id: 0,
      presupuesto: 0,
      unidad: '',
      tipoDeBien: '',
      cantidad: 0,
      valorUnitario: 0,
      valorTotal: 0,
      fechaAdquisicion: ' ',
      proveedor: '',
      documentacion: '',
      activo: true,
    };
  }

  constructor(private adquisicionService: AdquisicionService) {}

  ngOnChanges(): void {
    if (this.adquisicionEditada) {
      this.modoEdicion = true;
      this.nuevaAdquisicion = { ...this.adquisicionEditada }; // Copia los datos de la fila a editar
      this.valoresOriginales = { ...this.adquisicionEditada };
      this.calcularValorTotal();
    } else {
      this.modoEdicion = false;
      this.nuevaAdquisicion =this.limpiarAdquisicion();
    }
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.modoEdicion) {
      this.adquisicionService
        .editarAdquisicion(this.nuevaAdquisicion)
        .subscribe({
          next: () => {
            this.adquisicionAgregada.emit();
          },
          error: (error) => {
            console.error('Error al editar la adquisición:', error);
          }
        });
    } else {
      this.adquisicionService
        .agregarAdquisicion(this.nuevaAdquisicion)
        .subscribe({
          next: () => {
            this.adquisicionAgregada.emit(); // Notificar que se agregó una adquisición
          },
          error: (error) => {
            console.error('Error al agregar la adquisición:', error);
          }
        });
    }
    this.cerrarModal(); // Cerrar el modal
  }

  // Método para cerrar el modal
  cerrarModal(): void {
    if (!this.modoEdicion) {
      this.nuevaAdquisicion = this.limpiarAdquisicion();
      this.adquisicionEditada = null;
      this.modoEdicion = false;
    }

    const modal = document.getElementById('agregarAdquisicionModal');
    if (modal) {
      modal.style.display = 'none'; // Ocultar el modal
    }
  }

  calcularValorTotal(): void {
    this.nuevaAdquisicion.valorTotal =
      this.nuevaAdquisicion.cantidad * this.nuevaAdquisicion.valorUnitario;
  }
}
