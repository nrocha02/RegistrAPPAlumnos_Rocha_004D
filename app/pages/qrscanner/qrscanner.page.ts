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

  async sendScan() {}
}
