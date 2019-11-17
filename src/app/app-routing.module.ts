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
  {
    path: 'saza-setup',
    loadChildren: './pages/saza-setup/saza-setup.module#SazaSetupPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'create-account',
    loadChildren: './pages/create-account/create-account.module#CreateAccountPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'link-account',
    loadChildren: './pages/link-account/link-account.module#LinkAccountPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'operations/create-account',
    loadChildren: './pages/operations/create-account/create-account.module#CreateAccountPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'operations/payment',
    loadChildren: './pages/operations/payment/payment.module#PaymentPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'operations/sell-offer',
    loadChildren: './pages/operations/sell-offer/sell-offer.module#SellOfferPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'operations/buy-offer',
    loadChildren: './pages/operations/buy-offer/buy-offer.module#BuyOfferPageModule',
    canActivate: [AuthGuard]
 },
  { path: 'operations/passive-offer',
    loadChildren: './pages/operations/passive-offer/passive-offer.module#PassiveOfferPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'operations/bump-sequence',
    loadChildren: './pages/operations/bump-sequence/bump-sequence.module#BumpSequencePageModule',
    canActivate: [AuthGuard]
  },
  { path: 'operations/manage-data',
    loadChildren: './pages/operations/manage-data/manage-data.module#ManageDataPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'operations/account-merge',
    loadChildren: './pages/operations/account-merge/account-merge.module#AccountMergePageModule',
    canActivate: [AuthGuard]
  },
  { path: 'operations/allow-trust',
    loadChildren: './pages/operations/allow-trust/allow-trust.module#AllowTrustPageModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
