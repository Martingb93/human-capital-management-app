import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@core/authentication/components/login/login.component';
import { AuthtenticationGuard } from '@core/authentication/services';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@shared/components/private-pages').then(mod => mod.PrivatePagesComponent),
        canActivate: [AuthtenticationGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                pathMatch: 'full',
            },
            {
                path: 'admin',
                loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
            },
            {
                path: 'manager',
                loadChildren: () => import('./pages/manager/manager.module').then(m => m.ManagerModule),
            },
            {
                path: 'settings',
                loadComponent: () => import('./pages/settings/settings.component').then(mod => mod.SettingsComponent),
            },
        ],
    },
    { path: 'login', component: LoginComponent },
    {
        path: '**', redirectTo: 'dashboard',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
