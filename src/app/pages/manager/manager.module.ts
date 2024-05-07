import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ManagerComponent } from './manager.component';
import { ManagerRoutingModule } from './manager-routing.module';

@NgModule({
    declarations: [ManagerComponent],
    imports: [CommonModule, ManagerRoutingModule],
    providers: [],
})
export class ManagerModule { }
