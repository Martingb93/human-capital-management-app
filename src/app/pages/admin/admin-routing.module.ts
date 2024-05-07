import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { adminGuard } from './admin.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [adminGuard],
        children: [
            {
                path: 'employee-records',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./admin-employees/admin-employee-records.component').then(mod => mod.AdminEmployeeRecordsComponent),
                    },
                    {
                        path: 'record',
                        loadComponent: () => import('./admin-employees/admin-employee-record/admin-employee-record.component').then(m => m.AdminEmployeeRecordComponent),
                    },
                ],
            },
            {
                path: 'departments',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./admin-departments/admin-departments.component').then(mod => mod.AdminDepartmentsComponent),
                    },
                    {
                        path: 'department',
                        loadComponent: () => import('./admin-departments/admin-department/admin-department.component').then(mod => mod.AdminDepartmentComponent),
                    },
                ],
                
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
