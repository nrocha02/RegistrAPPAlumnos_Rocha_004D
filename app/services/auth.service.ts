import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { IUsersAlumnos, UserAlumno } from "../pages/interfaces/interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  CrearUsuario(newUsuario: UserAlumno): Observable<UserAlumno> {
    return this.httpClient.post<UserAlumno>(
      `${environment.apiUrl}/alumnos`,
      newUsuario
    );
  }

  GetAllUsers(): Observable<IUsersAlumnos> {
    return this.httpClient.get<IUsersAlumnos>(`${environment.apiUrl}/alumnos`);
  }

  GetUserByEmail(email: any): Observable<IUsersAlumnos> {
    return this.httpClient.get<IUsersAlumnos>(
      `${environment.apiUrl}/alumnos/?email=${email}`
    );
  }

  GetUserById(id: any): Observable<IUsersAlumnos> {
    return this.httpClient.get<IUsersAlumnos>(
      `${environment.apiUrl}/alumnos/?id=${id}`
    );
  }

  ActualizarAlumno(usuario: any): Observable<IUsersAlumnos> {
    return this.httpClient.put<IUsersAlumnos>(
      `${environment.apiUrl}/alumnos/${usuario.id}`,
      usuario
    );
  }

  IsLoggedIn() {
    return sessionStorage.getItem("nombre") != null;
  }

  GetName() {
    return sessionStorage.getItem("nombre");
  }

  GetUserrole() {
    return sessionStorage.getItem("userrole") != null
      ? sessionStorage.getItem("userrole")?.toString()
      : "";
  }

  logout() {
    sessionStorage.clear();
  }
}
