import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminStateService } from './services/admin-state.service';
import { AdminApiService } from './services/admin-api.service';

@NgModule({
    declarations: [AdminComponent],
    imports: [CommonModule, AdminRoutingModule],
    providers: [
        AdminStateService,
        AdminApiService
    ],
})
export class AdminModule {}
