import { UserComponent } from './user/user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/login'},
    { path: 'home', component: HomeComponent },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    }
];
