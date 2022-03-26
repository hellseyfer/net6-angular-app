import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'guest',
        //except: ['admin', 'user'],
      },
    }, 
  },
  {
    path: 'panel-admin',
    loadChildren: () =>
      import('./features/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'admin',
        //except: ['guest', 'user'],
      },
    }, 
  },
  {
    path: 'panel-user',
    loadChildren: () =>
      import('./features/user-dashboard/user-dashboard.module').then(
        (m) => m.UserDashboardModule
      ),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'user',
        //except: ['guest', 'admin'],
      },
    },
  },
  {
    path: 'lazy-table',
    loadChildren: () => 
      import('./features/filter-table/filter-table.module').then(
        (m) => m.FilterTableModule
      )
  },
  /*   { path: 'not-found', component: PageNotFoundComponent }, */
   { path: '**', redirectTo: 'home' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
