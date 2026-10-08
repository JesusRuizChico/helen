import {Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  constructor( public afAuth: AngularFireAuth, private router: Router) {}

  logout(): void {
    // Implement your logout logic here
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']); // Redirect to login page after logout
    });
  }
}
