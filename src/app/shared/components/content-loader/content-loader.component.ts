import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from '@core/material';

@Component({
    selector: 'hcm-content-loader',
    standalone: true,
    imports: [CommonModule, MATERIAL_MODULES],
    templateUrl: './content-loader.component.html',
    styleUrls: ['./content-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentLoaderComponent {
    public config = {
        strokeWidth: 4,
        diameter: 50,
    };
}
