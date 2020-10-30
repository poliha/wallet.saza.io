import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './providers/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'usage-terms',
    loadChildren: () => import('./pages/usage-terms/usage-terms.module').then(m => m.UsageTermsPageModule),
  },
  {
    path: 'privacy-policy',
    loadChildren:
      () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule),
  },
  {
    path: 'saza-setup',
    loadChildren: () => import('./pages/saza-setup/saza-setup.module').then(m => m.SazaSetupPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'forgot-password',
    loadChildren:
      () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'new-account',
    loadChildren: () => import('./pages/new-account/new-account.module').then(m => m.NewAccountPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'link-account',
    loadChildren:
      () => import('./pages/link-account/link-account.module').then(m => m.LinkAccountPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/create-account',
    loadChildren:
      () => import('./pages/operations/create-account/create-account.module').then(m => m.CreateAccountPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/payment',
    loadChildren: () => import('./pages/operations/payment/payment.module').then(m => m.PaymentPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/sell-offer',
    loadChildren:
      () => import('./pages/operations/sell-offer/sell-offer.module').then(m => m.SellOfferPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/buy-offer',
    loadChildren:
      () => import('./pages/operations/buy-offer/buy-offer.module').then(m => m.BuyOfferPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/passive-offer',
    loadChildren:
      () => import('./pages/operations/passive-offer/passive-offer.module').then(m => m.PassiveOfferPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/bump-sequence',
    loadChildren:
      () => import('./pages/operations/bump-sequence/bump-sequence.module').then(m => m.BumpSequencePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/manage-data',
    loadChildren:
      () => import('./pages/operations/manage-data/manage-data.module').then(m => m.ManageDataPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/account-merge',
    loadChildren:
      () => import('./pages/operations/account-merge/account-merge.module').then(m => m.AccountMergePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/allow-trust',
    loadChildren:
      () => import('./pages/operations/allow-trust/allow-trust.module').then(m => m.AllowTrustPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/change-trust',
    loadChildren:
      () => import('./pages/operations/change-trust/change-trust.module').then(m => m.ChangeTrustPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'build-tx',
    loadChildren: () => import('./pages/build-tx/build-tx.module').then(m => m.BuildTxPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-tx',
    loadChildren: () => import('./pages/sign-tx/sign-tx.module').then(m => m.SignTxPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations-queue',
    loadChildren:
      () => import('./pages/operations-queue/operations-queue.module').then(m => m.OperationsQueuePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations-queue/:id',
    loadChildren:
      () => import('./pages/operations-queue-detail/operations-queue-detail.module').then(m => m.OperationsQueueDetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'account-history-detail',
    loadChildren:
      () => import('./pages/account-history-detail/account-history-detail.module').then(m => m.AccountHistoryDetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-accounts',
    loadChildren:
      () => import('./pages/manage-accounts/manage-accounts.module').then(m => m.ManageAccountsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-accounts/:id',
    loadChildren:
      () => import('./pages/manage-accounts-detail/manage-accounts-detail.module').then(m => m.ManageAccountsDetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'change-password',
    loadChildren:
      () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/set-options',
    loadChildren:
      () => import('./pages/operations/set-options/set-options.module').then(m => m.SetOptionsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/path-receive',
    loadChildren:
      () => import('./pages/operations/path-receive/path-receive.module').then(m => m.PathReceivePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'operations/path-send',
    loadChildren:
      () => import('./pages/operations/path-send/path-send.module').then(m => m.PathSendPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'export-account',
    loadChildren:
      () => import('./pages/export-account/export-account.module').then(m => m.ExportAccountPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'import-account',
    loadChildren:
      () => import('./pages/import-account/import-account.module').then(m => m.ImportAccountPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
