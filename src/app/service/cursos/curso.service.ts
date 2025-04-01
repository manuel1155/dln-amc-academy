import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Curso } from './../../interfaces/curso';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private baseUrl: string = 'http://ec2-54-146-53-229.compute-1.amazonaws.com:3000';

  constructor(private firestore: Firestore, private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseUrl}/cursos`);
  }

  getCursoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cursos/${id}`);
  }

  getCursoAsigAlumno(idAlumno: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/alumnos/${idAlumno}/cursos`);
  }

  putIniciarAsignacion(idAsignacion: number) {
    return new Promise((resolve) => {
      const userDateISO = new Date().toISOString();
      const body = { updatedAt: userDateISO };

      try {
        this.http
          .put(`${this.baseUrl}/asignacion/${idAsignacion}/iniciar`, body)
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
