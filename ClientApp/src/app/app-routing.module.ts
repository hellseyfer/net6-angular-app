import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo:'/home', pathMatch:'full'},
   { path: 'home', component: HomeComponent, pathMatch: 'full' },
   {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'panel-admin',
    loadChildren: () =>
      import('./features/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path: 'panel-user',
    loadChildren: () =>
      import('./features/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
  },
 /*   { path: 'not-found', component: PageNotFoundComponent },
   { path: '**', redirectTo: '/not-found' }, */
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }