import { Component } from '@angular/core';
import { AdquisicionService, Adquisicion } from '../services/adquisicion.service';
@Component({
  selector: 'app-home-adquisition',
  imports: [],
  templateUrl: './home-adquisition.component.html',
  styleUrl: './home-adquisition.component.css'
})
export class HomeAdquisitionComponent {
  adquisiciones: Adquisicion[] = [];

  constructor(private adquisicionService: AdquisicionService) { }

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
      }
    });
  }
}
