import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthServices } from "../services/auth.services";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: []
})


export class LoginComponent implements OnInit {

    constructor(private auth: AuthServices, private router: Router) {}

    ngOnInit(): void {
        // Si ya hay sesion iniciada no tiene caso mostrar el login
        this.auth.getUser().subscribe(user => {
            console.log('User is logged in:', user);
            this.router.navigate(['/']);
        });
    }

    loginWithGoogle() {
        return this.auth.login().then((loggedIn) => {
            console.log("click loginWithGoogle");
            if (loggedIn) {
                this.router.navigate(['/']);
            }
        });
    }

}
