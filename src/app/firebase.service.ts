import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private readonly afs: Firestore) {}

  async getDocument(coll: string, id: string) {
    const snap = await getDoc(doc(this.afs, coll, id));
    if (snap.exists()) return snap.data();
    else return Promise.reject(Error(`No such document: ${coll}.${id}`));
  }
}
