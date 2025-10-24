import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { List } from './components/list/list';
import { AuthGuard } from './services/auth-guard';
import { Profile } from './components/profile/profile';


export const routes: Routes = [
    {path:'',component:Home},
    { path: 'login', component: Login },
    {path:'register',component: Register},
    {path:'list',component: List,canActivate: [AuthGuard]},
    {path:'profile/:id',component: Profile,canActivate: [AuthGuard]},
    {path:'**',redirectTo:''}
];
