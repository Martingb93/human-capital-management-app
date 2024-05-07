import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { UserStateService } from '@core/services/user';
import { UserTypeRoleEnum } from '@core/models';

export const adminGuard: CanActivateFn = (_: ActivatedRouteSnapshot) => {
    const currentUser$ = toObservable(inject(UserStateService).currentUser)

    return currentUser$.pipe(
        filter(user => !!user),
        map(user => user.type === UserTypeRoleEnum.Admin)
    );
};
