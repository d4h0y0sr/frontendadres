import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Adquisicion {
  id: number;
  presupuesto: number;
  unidad: string;
  tipoDeBien: string;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
  fechaAdquisicion: string;
  proveedor: string;
  documentacion: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdquisicionService {

  private apiUrl = '/api/adquisiciones';

  constructor(private http: HttpClient) { }

  getAdquisiciones(): Observable<Adquisicion[]> {
    return this.http.get<Adquisicion[]>(this.apiUrl);
  }

  agregarAdquisicion(adquisicion: Adquisicion): Observable<void> {
    return this.http.post<void>(this.apiUrl, adquisicion);
  }

  editarAdquisicion(adquisicion: any): Observable<void> {
    console.log("EDITO ADQUISICION ENDPOINT")
    return this.http.put<void>(`${this.apiUrl}/${adquisicion.id}`, adquisicion);
  }

  eliminarAdquisicion(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/desactivar`, {});
  }

  obtenerHistorial(idAdquisicion: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${idAdquisicion}/Historial`);
  }


}
