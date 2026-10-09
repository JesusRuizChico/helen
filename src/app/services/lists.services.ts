import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
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

    add(name: string): Promise<void> {
        return this.afAuth.authState.pipe(take(1)).toPromise().then(user => {
            if (!user) {
                throw new Error('No hay sesion iniciada');
            }
            const list: IList = { name: name, createdAt: Date.now() };
            return this.afs.collection<IList>(this.path(user.uid)).add(list).then(() => {
                console.log('List added successfully');
            });
        });
    }

    getAll(): Observable<IList[]> {
        return this.afAuth.authState.pipe(
            switchMap(user => user
                ? this.afs.collection<IList>(this.path(user.uid), ref => ref.orderBy('createdAt', 'desc'))
                    .valueChanges({ idField: 'id' })
                : of([])
            )
        );
    }
}
