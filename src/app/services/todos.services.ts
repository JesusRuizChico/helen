import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { ITodo } from '../structures/todos';


@Injectable()

export class TodosServices {

    constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

    // Las tareas de cada lista se guardan en users/{uid}/lists/{listId}/todos
    private path(uid: string, listId: string): string {
        return `users/${uid}/lists/${listId}/todos`;
    }

    private uid(): Promise<string> {
        return this.afAuth.authState.pipe(take(1)).toPromise().then(user => {
            if (!user) {
                throw new Error('No hay sesion iniciada');
            }
            return user.uid;
        });
    }

    getAll(listId: string): Observable<ITodo[]> {
        return this.afAuth.authState.pipe(
            switchMap(user => user
                ? this.afs.collection<ITodo>(this.path(user.uid, listId), ref => ref.orderBy('createdAt', 'asc'))
                    .valueChanges({ idField: 'id' })
                : of([])
            )
        );
    }

    add(listId: string, title: string): Promise<void> {
        return this.uid().then(uid => {
            const todo: ITodo = { title: title, done: false, createdAt: firestore.FieldValue.serverTimestamp() };
            return this.afs.collection<ITodo>(this.path(uid, listId)).add(todo).then(() => {
                console.log({ title: title });
            });
        });
    }

    toggle(listId: string, todo: ITodo): Promise<void> {
        return this.uid().then(uid =>
            this.afs.doc<ITodo>(`${this.path(uid, listId)}/${todo.id}`).update({ done: !todo.done })
        );
    }

    remove(listId: string, todo: ITodo): Promise<void> {
        return this.uid().then(uid =>
            this.afs.doc<ITodo>(`${this.path(uid, listId)}/${todo.id}`).delete()
        );
    }
}
