import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { isAuthorized } from './authorization/isAuthorized';
import { HomeComponent } from './pages/home/home.component';

const accountModule = () => import('./pages/account/account.module').then(x => x.AccountModule)

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'home/login', component: HomeComponent, },
  { path: 'account', loadChildren: accountModule, canActivate:[isAuthorized] },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
