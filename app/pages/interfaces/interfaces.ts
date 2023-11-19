export interface IUsersAlumnos {
  id: Number;
  nombre: String;
  email: String;
  password: String;
}

export interface UserAlumno {
  nombre: String;
  email: String;
  password: String;
}

export interface IAsistencias {
  id: Number;
  alumno: String;
  docente: String;
  asignatura: String;
  fecha: Date;
}

export interface Asistencia {
  alumno: String;
  docente: String;
  asignatura: String;
  fecha: Date;
}
