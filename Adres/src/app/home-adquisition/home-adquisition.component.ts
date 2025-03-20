import { Component,ViewChild } from '@angular/core';
import { AgregarAdquisicionModalComponent } from '../components/agregar-adquisicion-modal/agregar-adquisicion-modal.component';
import { HistorialModalComponent } from '../components/historial-modal/historial-modal.component';

import {
  AdquisicionService,
  Adquisicion,
} from '../services/adquisicion.service';
@Component({
  selector: 'app-home-adquisition',
  imports: [AgregarAdquisicionModalComponent,HistorialModalComponent],
  templateUrl: './home-adquisition.component.html',
  styleUrl: './home-adquisition.component.css',
})
export class HomeAdquisitionComponent {
  adquisiciones: Adquisicion[] = [];
  adquisicionEditada: any = null;
  @ViewChild(HistorialModalComponent) historialModal!: HistorialModalComponent;

  constructor(private adquisicionService: AdquisicionService) {}

  ngOnInit(): void {
    this.getAdquisiciones();
  }

  getAdquisiciones(): void {
    this.adquisicionService.getAdquisiciones().subscribe({
      next: (data) => {
        this.adquisiciones = data;
      },
      error: (error) => {
        console.error('Error al obtener las adquisiciones:', error);
      },
      complete: () => {
        console.log('Solicitud completada');
      },
    });
  }

  // Método para abrir el modal
  abrirModal(adquisicion?: Adquisicion): void {
    this.adquisicionEditada = adquisicion || null;
    !adquisicion&&console.log("NULA")
    const modal = document.getElementById('agregarAdquisicionModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  actualizarTabla(): void {
    this.getAdquisiciones();
  }

  eliminarAdquisicion(adquisicion: Adquisicion): void {
    if (confirm('¿Estás seguro de que deseas desactivar esta adquisición?')) {
      this.adquisicionService.eliminarAdquisicion(adquisicion.id).subscribe({
        next: () => {
          this.actualizarTabla(); // Actualiza la tabla después de desactivar
        },
        error: (error) => {
          console.error('Error al desactivar la adquisición:', error);
        }
      });
    }
  }

  abrirHistorial(idAdquisicion: number): void {
    this.historialModal.abrirModal(idAdquisicion); // Abre el modal de historial
  }

}
