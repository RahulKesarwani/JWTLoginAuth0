import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGard} from './gard_service/auth.gard';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGard], canDeactivate: [AuthGard]}
];

export const routingComponents = [LoginComponent];
export const routing = RouterModule.forRoot(appRoutes, {useHash: true});