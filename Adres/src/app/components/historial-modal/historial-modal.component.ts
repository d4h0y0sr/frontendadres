import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdquisicionService } from '../../services/adquisicion.service';

@Component({
  selector: 'historial-modal',
  templateUrl: './historial-modal.component.html',
  imports:[CommonModule],
  styleUrls: ['./historial-modal.component.css']
})
export class HistorialModalComponent {
  @Input() idAdquisicion: number | null = null; // Recibe el ID de la adquisición
  @Output() cerrar = new EventEmitter<void>(); // Evento para cerrar el modal

  mostrarModal: boolean = false; // Controla la visibilidad del modal
  historial: any[] = [];

  constructor(private adquisicionService: AdquisicionService) { }

  abrirModal(idAdquisicion : number): void {

    if (idAdquisicion) {
      console.log(this.adquisicionService)
      this.adquisicionService.obtenerHistorial(idAdquisicion).subscribe({
        next: (data) => {
          console.log(data, "@")
          this.historial = data;
          this.mostrarModal = true;
        },
        error: (error) => {
          console.error('Error al obtener el historial:', error);
        }
      });
    }
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  obtenerCampos(cambios: any): string[] {
    return Object.keys(cambios || {});
  }

}
