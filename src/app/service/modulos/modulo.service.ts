import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  private baseUrl: string = 'http://ec2-54-146-53-229.compute-1.amazonaws.com:3000/cursos';
  private baseUrl2: string = 'http://ec2-54-146-53-229.compute-1.amazonaws.com:3000';

  constructor(private http: HttpClient) { }

  getModulosCurso(idCurso: number): Observable<any[]> {
    console.log(idCurso);
    console.log(`${this.baseUrl}/${idCurso}`)
    return this.http.get<any[]>(`${this.baseUrl}/${idCurso}/modulos`);
  }

  getDetalleModulo(idCurso: number, idModulo: number, idAsig: number): Observable<any[]> {
    const body = {
      idAsig: idAsig
    }
    return this.http.get<any[]>(`${this.baseUrl}/${idCurso}/asignacion/${idAsig}/modulos/${idModulo}`);
  }

  getModSubDetInfo(idAsig: number, idCurso: number){
    return this.http.get<any>(`${this.baseUrl}/${idCurso}/asignacion/${idAsig}/detalles`);
  }

  postIniciarModulo(idAsignacion: number, idModulo: number) {
    return new Promise((resolve) => {
      const userDateISO = new Date().toISOString();
      const body = { updatedAt: userDateISO };

      try {
        this.http.post(`${this.baseUrl2}/asignacion/${idAsignacion}/modulo/${idModulo}/iniciar`, body)
          .subscribe((data) => {
            console.log('data', data);
            resolve(data);
          });
      } catch (error) {
        console.log('error', error);
        resolve({ status: 500, error: error });
      }
    });
  }

  postIniciarSubmodulo(idAsignacion: number, idSubmodulo: number) {
    return new Promise((resolve) => {
      const userDateISO = new Date().toISOString();
      const body = { updatedAt: userDateISO };

      try {
        this.http.post(`${this.baseUrl2}/asignacion/${idAsignacion}/submodulo/${idSubmodulo}/iniciar`, body)
          .subscribe((data) => {
            console.log('data', data);
            resolve(data);
          });
      } catch (error) {
        console.log('error', error);
        resolve({ status: 500, error: error });
      }
    });
  }


}
