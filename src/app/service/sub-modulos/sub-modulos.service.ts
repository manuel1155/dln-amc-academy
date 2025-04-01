import { Injectable } from '@angular/core';
import { Recurso } from './../../interfaces/modulos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubModulosService {
  private baseUrl: string = 'http://ec2-54-146-53-229.compute-1.amazonaws.com:3000/submodulos';

  constructor(private http: HttpClient) {}

  getRecursosPorSubmodulo(idSubMod: number): Observable<Recurso[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${idSubMod}/recursos`);
    //modificar
  }
}
