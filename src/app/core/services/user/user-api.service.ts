import { Injectable } from '@angular/core';

import { UserViewModel } from './models';
import { Observable } from 'rxjs';
import { BaseApi } from '../base/base-api';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserApiService extends BaseApi {
    protected override get controller(): string {
        return 'User';
    }

    public getCurrentUser(token: string): Observable<UserViewModel> {
        const headers = new HttpHeaders().set('authorization', token);
        
        return this.get<UserViewModel>('GetCurrentUser', null, headers);
    }
}
