import { Injectable } from '@angular/core';
import { Firestore, collectionData, updateDoc, deleteDoc, doc, collection, setDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Modulo } from './../../interfaces/modulos';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  private modulosCollection = collection(this.firestore, 'modulos');

  constructor(private firestore: Firestore) { }

  getModulosCurso(idCurso: string): Observable<Modulo[]> {
    const q = query(
      this.modulosCollection,
      where('id_curso', '==', idCurso),
      orderBy('orden','asc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Modulo[]>;
  }
  async addModule(modulo: Modulo) {
    
    const docRef = doc(collection(this.firestore, 'modulos'));
    const id = docRef.id;
    const documentData = { ...modulo, id };

    return await setDoc(docRef, documentData);
  }

  updateModulo(id: string, modulo: Modulo) {
    const moduloDoc = doc(this.firestore, `modulos/${id}`);
    return updateDoc(moduloDoc, { ...modulo });
  }

  deleteModulo(id: string) {
    const moduloDoc = doc(this.firestore, `modulos/${id}`);
    return deleteDoc(moduloDoc);
  }

}
