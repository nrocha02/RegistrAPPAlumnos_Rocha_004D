import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-perfilactualizar",
  templateUrl: "./perfilactualizar.page.html",
  styleUrls: ["./perfilactualizar.page.scss"],
})
export class PerfilactualizarPage implements OnInit {
  alumno = {
    id: 0,
    nombre: "",
    email: "",
    password: "",
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getUsuarioById(this.getIdFromUrl());
  }

  getIdFromUrl() {
    let url = this.router.url;
    let arr = url.split("/", 3);
    let id = parseInt(arr[2]);
    return id;
  }

  getUsuarioById(usuarioID: number) {
    this.authService.GetUserById(usuarioID).subscribe((resp: any) => {
      console.log(resp);
      this.alumno = {
        id: resp[0].id,
        nombre: resp[0].nombre,
        email: resp[0].email,
        password: resp[0].password,
      };
    });
  }

  ActualizarUsuario() {
    this.authService.ActualizarAlumno(this.alumno).subscribe();
    this.mostrarMensaje();
    this.router.navigateByUrl("/inicio");
  }

  async mostrarMensaje() {
    const alerta = await this.alertController.create({
      header: "Usuario Actualizado ",
      message: "Su información se ha modificado " + this.alumno.nombre,
      buttons: ["OK"],
    });
    alerta.present();
  }
}
