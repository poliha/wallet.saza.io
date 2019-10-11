import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './providers/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'saza-setup', loadChildren: './pages/saza-setup/saza-setup.module#SazaSetupPageModule', canActivate: [AuthGuard] },
  { path: 'create-account', loadChildren: './pages/create-account/create-account.module#CreateAccountPageModule', canActivate: [AuthGuard] },
  { path: 'link-account', loadChildren: './pages/link-account/link-account.module#LinkAccountPageModule', canActivate: [AuthGuard] },
  { path: 'operations/create-account', loadChildren: './pages/operations/create-account/create-account.module#CreateAccountPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [AuthGuard] },
  { path: 'operations/payment', loadChildren: './pages/operations/payment/payment.module#PaymentPageModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
