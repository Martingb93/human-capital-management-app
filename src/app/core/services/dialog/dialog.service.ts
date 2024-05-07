import { ComponentType } from '@angular/cdk/overlay';
import { Injectable, TemplateRef, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { Subscription, concatMap, firstValueFrom, from, take, takeUntil, tap } from 'rxjs';

import { DialogBase } from './dialog-base';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    private readonly matDialogService = inject(MatDialog);

    public open<T, D = any, R = any>(component: ComponentType<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> {
        const disableClose = config?.disableClose;

        if (config) {
            config.disableClose = true;
        }

        let backDropClickSub: Subscription;
        let ref = this.matDialogService.open(component, config);
        const componentInstance: DialogBase<T> = ref.componentInstance as any;

        if (disableClose === false) {
            if (componentInstance.canCloseDialog) {
                backDropClickSub = ref
                    .backdropClick()
                    .pipe(
                        concatMap(async () => componentInstance.canCloseDialog()),
                        takeUntil(ref.afterClosed())
                    )
                    .subscribe(result => {
                        if (result) {
                            ref.close();
                        }
                    });
            } else {
                backDropClickSub = ref
                    .backdropClick()
                    .pipe(takeUntil(ref.afterClosed()))
                    .subscribe(() => ref.close());
            }
        }

        ref.afterClosed()
            .pipe(take(1))
            .subscribe(() => {
                ref = null;

                if (backDropClickSub?.unsubscribe) {
                    backDropClickSub.unsubscribe();
                }
            });

        return ref;
    }
}
