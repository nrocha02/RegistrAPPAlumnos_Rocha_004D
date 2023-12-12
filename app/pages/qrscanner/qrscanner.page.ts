import { Component, OnDestroy, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { AsistenciaService } from "src/app/services/asistencia.service";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { Asistencia } from "../interfaces/interfaces";

@Component({
  selector: "app-qrscanner",
  templateUrl: "./qrscanner.page.html",
  styleUrls: ["./qrscanner.page.scss"],
})
export class QrscannerPage implements OnInit, OnDestroy {
  scannedResult: any;
  scannedCourse: any;
  content_visibility = "";
  email: any = localStorage.getItem("email");

  newAsistencia: Asistencia = {
    alumno: "",
    docente: "",
    asignatura: "",
    fecha: "",
  };

  constructor(
    private menuController: MenuController,
    private asistenciasService: AsistenciaService
  ) {}

  ngOnInit() {}

  mostrarMenu() {
    this.menuController.open("first");
  }

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      // @ts-ignore: Object is possibly 'null'.
      document.querySelector("body").classList.add("scanner-active");
      this.content_visibility = "hidden";
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      // @ts-ignore: Object is possibly 'null'.
      document.querySelector("body").classList.remove("scanner-active");
      this.content_visibility = "";
      if (result?.hasContent) {
        this.scannedResult = result.content;
        this.scannedCourse = Array.from(this.scannedResult)
          .slice(0, 7)
          .join("");
        console.log(this.scannedResult);
        this.sendScan();
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    // @ts-ignore: Object is possibly 'null'.
    document.querySelector("body").classList.remove("scanner-active");
    this.content_visibility = "";
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

  async sendScan() {
    // Verifica si se ha escaneado algo antes de enviarlo
    if (this.scannedResult) {
      // Construye la asistencia usando los datos escaneados
      this.newAsistencia = {
        alumno: this.email, // Utiliza el email almacenado localmente
        docente: "Nombre del docente", // Reemplaza con el nombre del docente si está disponible
        asignatura: "Nombre de la asignatura", // Reemplaza con el nombre de la asignatura si está disponible
        fecha: new Date().toISOString(), // Utiliza la fecha actual como ejemplo
      };

      // Envía la asistencia al servicio
      this.asistenciasService.guardarAsistencia(this.newAsistencia).subscribe(
        (response) => {
          // Maneja la respuesta del servidor si es necesario
          console.log("Asistencia guardada:", response);
          // Aquí puedes agregar lógica adicional después de guardar la asistencia
        },
        (error) => {
          // Maneja cualquier error de la solicitud HTTP
          console.error("Error al guardar la asistencia:", error);
        }
      );
    } else {
      console.log("No se ha escaneado ningún código");
    }
  }
}
