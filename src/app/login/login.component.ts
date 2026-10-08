import { Component, OnInit } from "@angular/core";
import { AuthServices } from "../services/auth.services";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: []
})


export class LoginComponent implements OnInit {

    constructor(private auth: AuthServices) {}

    ngOnInit(): void {
        this.auth.getUser().subscribe(user => {
            if (user) {
                console.log('User is logged in:', user);
            } else {
                console.log('User is not logged in');
            }
        });
    }

    login() {
        this.auth.login().then(
            () => {
                console.log("click login");
            }
        );
    }

    loginWithGoogle() {
        return this.auth.login().then(
            () => {
                console.log("click loginWithGoogle");
            }
        );
    }

}