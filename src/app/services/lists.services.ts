import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { IList } from '../structures/lists';


@Injectable()

export class ListsServices {

    constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

    // Las listas de cada usuario se guardan en users/{uid}/lists
    private path(uid: string): string {
        return `users/${uid}/lists`;
    }

    // Resuelve con la lista guardada, incluyendo el id que le asigno Firestore
    add(title: string): Promise<IList> {
        return this.afAuth.authState.pipe(take(1)).toPromise().then(user => {
            if (!user) {
                throw new Error('No hay sesion iniciada');
            }
            const list: IList = { title: title, createdAt: firestore.FieldValue.serverTimestamp() };
            return this.afs.collection<IList>(this.path(user.uid)).add(list).then((ref) => {
                console.log({ title: title });
                return { id: ref.id, title: title };
            });
        });
    }

    getAll(): Observable<IList[]> {
        return this.afAuth.authState.pipe(
            switchMap(user => user
                ? this.afs.collection<IList>(this.path(user.uid), ref => ref.orderBy('createdAt', 'asc'))
                    .valueChanges({ idField: 'id' })
                : of([])
            )
        );
    }

    get(id: string): Observable<IList> {
        return this.afAuth.authState.pipe(
            switchMap(user => user
                ? this.afs.doc<IList>(`${this.path(user.uid)}/${id}`).valueChanges()
                : of(undefined)
            )
        );
    }
}
