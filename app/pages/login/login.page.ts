import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  userdata: any;

  usuario = {
    id: 0,
    nombre: "",
    email: "",
    password: "",
  };

  loginForm: FormGroup;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private builder: FormBuilder
  ) {
    this.loginForm = this.builder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  ngOnInit() {}

  login() {
    if (this.loginForm.valid) {
      this.authservice
        .GetUserByEmail(this.loginForm.value.email)
        .subscribe((resp) => {
          this.userdata = resp;
          console.log(this.userdata);
          if (this.userdata.length > 0) {
            this.usuario = {
              id: this.userdata[0].id,
              nombre: this.userdata[0].nombre,
              email: this.userdata[0].email,
              password: this.userdata[0].password,
            };
            if (this.usuario.password === this.loginForm.value.password) {
              sessionStorage.setItem("id", this.usuario.id.toString());
              sessionStorage.setItem("nombre", this.usuario.nombre);
              sessionStorage.setItem("email", this.usuario.email);
              sessionStorage.setItem("ingresado", "true");
              this.router.navigateByUrl("/inicio");
            } else {
              this.Error();
            }
          } else {
            this.NoExiste();
            this.loginForm.reset();
          }
        });
    }
  }
  async showToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  async UserInactivo() {
    const alerta = await this.alertController.create({
      header: "Usuario inactivo",
      message: "Contactar a admin@admin.cl",
      buttons: ["OK"],
    });
    alerta.present();
  }

  async Error() {
    const alerta = await this.alertController.create({
      header: "Error",
      message: "Revise sus credenciales",
      buttons: ["OK"],
    });
    alerta.present();
  }

  async NoExiste() {
    const alerta = await this.alertController.create({
      header: "No existe...",
      message: "Debe registrarse..",
      buttons: ["OK"],
    });
    alerta.present();
  }
}
