import { Injectable, inject } from '@angular/core';
import { BaseApi } from '@core/services/base/base-api';

import { UserStateService } from '@core/services/user';
import { Observable } from 'rxjs';
import { AuthenticationResponse, Credentials } from '../models';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class AuthenticationService extends BaseApi {
    protected override get controller(): string {
        return 'Authentication';
    }

    public isUserLoggedIn: Observable<boolean>;
    public isActiveAccountValid$: Observable<boolean>;

    private readonly router = inject(Router);
    private readonly userStateService = inject(UserStateService);

    public login(credentials: Credentials): Observable<AuthenticationResponse> {
        return this.post<AuthenticationResponse, Credentials>('login', credentials);
    }

    public getToken(): string | null {
        return localStorage.getItem('token');
    }

    public validateToken(): Observable<boolean> {
        const headers = new HttpHeaders().set('authorization', this.getToken());

        return this.get<boolean>('validate-token', null, headers );
    }

    public loadCurrentUser(): void {
        this.userStateService.loadCurrentUser();
    }

    public logout() {
        localStorage.removeItem('token');
        this.userStateService.clearCurrentUser();
        this.router.navigate(['/login'])
    }
}
