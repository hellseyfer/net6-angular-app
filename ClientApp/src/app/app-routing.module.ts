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
        only: ['admin'],
        except: ['guest'],
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
        only: ['user'],
        except: ['guest'],
      },
    },
  },
  /*   { path: 'not-found', component: PageNotFoundComponent }, */
   { path: '**', redirectTo: 'home' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
