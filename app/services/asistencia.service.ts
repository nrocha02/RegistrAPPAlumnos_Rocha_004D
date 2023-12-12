import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Asistencia } from "../pages/interfaces/interfaces";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AsistenciaService {
  private apiUrl = environment.apiUrl; // Obteniendo la URL del entorno

  constructor(private http: HttpClient) {}

  guardarAsistencia(asistencia: Asistencia): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardarAsistencia`, asistencia);
  }
}
