import { Injectable, inject, signal } from '@angular/core';

import { UserApiService } from './user-api.service';
import { UserViewModel } from './models';
import { UserTypeRoleEnum } from '@core/models';

@Injectable({
    providedIn: 'root',
})
export class UserStateService {
    public currentUser = signal<UserViewModel>(null);
    public userTypeRole = signal<string>(null);;

    private userApiService = inject(UserApiService);

    public loadCurrentUser(): void {
        if (this.currentUser() == null) {
            this.userApiService.getCurrentUser().subscribe(user => {
                this.currentUser.set(user);
                this.userTypeRole.set(`${UserTypeRoleEnum[user.type]?.toLowerCase()}`);
            });
        }
    }

    public clearCurrentUser(): void {
        this.currentUser.set(null);
    }
}
