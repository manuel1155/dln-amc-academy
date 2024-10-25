import { Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from 'firebase/firestore';
import { SubModulo } from './../../interfaces/modulos';

@Injectable({
  providedIn: 'root',
})
export class SubModulosService {
  private id_modulo: string;
  private subModulosCollection = collection(this.firestore, 'sub-modulos');

  constructor(private firestore: Firestore) {
    this.id_modulo = '';
  }

  setModulo(id_modulo: string): void {
    this.id_modulo = id_modulo;
    this.subModulosCollection = collection(
      this.firestore,
      `modulos/${this.id_modulo}/sub-modulos`
    );
  }

  async addSubModule(subModulo: SubModulo) {
    const docRef = doc(this.subModulosCollection);
    const id = docRef.id;
    const documentData = { ...subModulo, id };

    return await setDoc(docRef, documentData);
  }
}
