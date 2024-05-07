import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from '@core/material';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'hcm-empty-content',
    standalone: true,
    imports: [CommonModule, MATERIAL_MODULES, RouterModule],
    templateUrl: './empty-content.component.html',
    styleUrls: ['./empty-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyContentComponent {
    @Input({ required: true }) public emptyContentKeyword: string;
    @Input() public actionKeyword: string;
    @Input() public additionalContentKeyword: string;
    @Input() public routerLink: string;

    @Output() public action = new EventEmitter<boolean>(false);

    public onAction(): void {
        this.action.emit();
    }
}
