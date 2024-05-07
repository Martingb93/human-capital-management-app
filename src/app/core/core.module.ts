import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MATERIAL_MODULES, MATERIAL_PROVIDERS } from './material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    providers: [...MATERIAL_PROVIDERS],
    imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_MODULES],
})
export class CoreModule {}
