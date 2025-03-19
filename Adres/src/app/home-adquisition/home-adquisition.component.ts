import { Component } from '@angular/core';
import { AgregarAdquisicionModalComponent } from '../components/agregar-adquisicion-modal/agregar-adquisicion-modal.component';

import {
  AdquisicionService,
  Adquisicion,
} from '../services/adquisicion.service';
@Component({
  selector: 'app-home-adquisition',
  imports: [AgregarAdquisicionModalComponent],
  templateUrl: './home-adquisition.component.html',
  styleUrl: './home-adquisition.component.css',
})
export class HomeAdquisitionComponent {
  adquisiciones: Adquisicion[] = [];
  adquisicionEditada: any = null;

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

}
