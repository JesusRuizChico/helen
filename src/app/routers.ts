import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrerComponent } from './registrer/registrer.component';
import { AuthGuards } from './guards/auth.guard.services';

export const router = [
    { path: '', component: HomeComponent, pathMatch: 'full' ,canActivate: [AuthGuards]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrerComponent }
]