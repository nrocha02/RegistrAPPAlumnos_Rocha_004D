import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage implements OnInit {
  alumno = {
    id: 0,
    nombre: "",
    email: "",
    password: "",
  };
  constructor(private authService: AuthService, private router: Router) {}

  ionViewWillEnter() {
    this.getAlumnoById(this.getIdFromUrl());
  }

  ngOnInit() {}

  getIdFromUrl() {
    let url = this.router.url;
    let arr = url.split("/", 3);
    let id = parseInt(arr[2]);
    return id;
  }

  getAlumnoById(alumnoID: number) {
    this.authService.GetUserById(alumnoID).subscribe((resp: any) => {
      this.alumno = {
        id: resp[0].id,
        nombre: resp[0].nombre,
        email: resp[0].email,
        password: resp[0].password,
      };
    });
  }

  updateAlumno() {
    this.authService.ActualizarAlumno(this.alumno).subscribe();
  }
}
