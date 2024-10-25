import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, addDoc, updateDoc, deleteDoc, doc, collection, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Curso } from './../../interfaces/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private cursosCollection = collection(this.firestore, 'cursos');

  constructor(private firestore: Firestore) { }

  getCursos(): Observable<Curso[]> {
    return collectionData(this.cursosCollection, { idField: 'id' }) as Observable<Curso[]>;
  }

  getcursoById(id: string): Observable<Curso> {
    const cursoDoc = doc(this.firestore, `cursos/${id}`);
    return docData(cursoDoc, { idField: 'id' }) as Observable<Curso>;
  }

  async addCurso(curso: Curso) {
    
    const docRef = doc(collection(this.firestore, 'cursos'));
    const id = docRef.id;

    const documentData = { ...curso, id };

    // Save the document with the ID as an attribute
    return await setDoc(docRef, documentData);
  }

  updateCurso(id: string, curso: Curso) {
    const cursoDoc = doc(this.firestore, `cursos/${id}`);
    return updateDoc(cursoDoc, { ...curso });
  }

  deleteCurso(id: string) {
    const cursoDoc = doc(this.firestore, `cursos/${id}`);
    return deleteDoc(cursoDoc);
  }

}
