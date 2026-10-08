import { Injectable } from '@angular/core';
import { IUser } from '../structures/users';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable()

export class UserServices {
    private usersCollection: AngularFirestoreCollection<IUser>;

    constructor(private afs: AngularFirestore) {
        this.usersCollection = afs.collection<IUser>('users');
    }


    add(user: IUser): Promise<void> {
        return this.usersCollection.doc(user.uid).set(user).catch(console.log);

    }
}