import {Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthServices } from '../services/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  constructor( public afAuth: AngularFireAuth, private auth: AuthServices, private router: Router) {}

  logout(): void {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']); // Regresa a la pantalla de inicio (solo boton de login)
    });
  }
}
