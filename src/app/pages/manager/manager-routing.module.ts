import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { managerGuard } from './manager.guard';

const routes: Routes = [
    {
        path: '',
        component: ManagerComponent,
        canActivate: [managerGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagerRoutingModule {}
