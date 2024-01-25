import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonGuard } from 'app/guards/common.guard';
import { AuthGuard } from '../guards/auth.guard';
import { BasisLayoutComponent } from '../shared/layout/basis-layout/basis-layout.component';
import { NotFoundComponent } from './error/not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    component: BasisLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'basis',
        loadChildren: () => import('./basis/basis.module').then((m) => m.BasisModule),
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      { path: 'test', component: TestComponent },
      { path: 'password', component: PasswordComponent },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '404',
    canActivate: [CommonGuard],
    component: NotFoundComponent,
  },
  // { path: 'login', component: LoginComponent }, 关闭自登录入口,启用公用登录
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: 333,
  exports: 333454,
})
export class RoutesRoutingModule {}
