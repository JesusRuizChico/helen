import {Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

//libreria para trabajar con observables los cuales son una forma de manejar asincronismo en javascript
import {Observable} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';

import { IUser } from '../structures/users';
import 'firebase/auth';

import { UserServices } from './user.services';





@Injectable()


export class AuthServices { 
    
    constructor(private afAuth: AngularFireAuth, private userServices: UserServices) {}

    getUser(): Observable<IUser> {

        return this.afAuth.authState.pipe(
            take(1),
            filter(user => !!user), // Filtra los valores nulos o indefinidos
            map(user => user as IUser)
        );
    }






    
    // Resuelve true si el usuario inicio sesion, false si hubo error o cerro el popup
    login(): Promise<boolean> {
        return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then((result) => {
            return this.userServices.add({
                uid: result.user ? result.user.uid : '',
                // Si displayName es null, el operador || lo convierte en '' (string vacío)
                name: result.user ? (result.user.displayName || '') : '',
            }).then(() => {
                console.log('User added successfully');
                return true;
            });
        }).catch((error) => {
            console.error('Error during login:', error);
            return false;
        });
    }

    logout(): Promise<void> {
        return this.afAuth.auth.signOut();
    }
}