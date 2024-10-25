import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  onAuthStateChanged,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl: string = '/admin-home';
  public user$: Observable<User | null>;
  private afs: Firestore = inject(Firestore);
  public userData!: Usuario | null;

  constructor(private auth: Auth) {
    this.user$ = new Observable<User | null>((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, async (user) => {
        observer.next(user);
        //if (user) this.userData = await this.userAcountData(user?.uid);
      });

      return () => unsubscribe();
    });
  }

  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password).then(async (data)=>{
      console.log(data.user.uid);
      await this.getUserData(data.user.uid);
      return data;
    });
  }

  logout2() {
    console.log('logout');
    return signOut(this.auth);
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  async getUserData(uid: string) : Promise<Usuario|null> {
    await new Promise((resolve) => {
      this.user$.subscribe(async (user) => {
        if (user) {
          const usersCollection = collection(this.afs, 'users');
          const userQuery = query(usersCollection, where('id', '==', user.uid));
          let data: Usuario =await getDocs(userQuery).then((snapshot) => {
            if (!snapshot.empty) {
              this.userData = <Usuario>snapshot.docs[0].data();
              return <Usuario>snapshot.docs[0].data();
            } else {
              return null as any;
            }
          });
          resolve(data);
        } else {
          resolve(null);
        }
      });
    }); // replace with actual admin uid
    return this.userData;
  }
}
