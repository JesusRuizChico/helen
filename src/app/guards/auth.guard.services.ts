import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, take, tap } from 'rxjs/operators';





@Injectable()
export class AuthGuards implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => !!user),

      tap((authenticated : boolean) => {
        
        if (!authenticated) {
          console.log('access denied');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
