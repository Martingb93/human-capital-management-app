import { inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export abstract class DialogBase<T> {
    public matDialogRef = inject(MatDialogRef<T>);

    public canCloseDialog(): boolean {
        return true;
    }

    public onClose(): void {
        this.matDialogRef.close();
    }
}
