import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { UserStateService } from '@core/services/user';


@Injectable({
    providedIn: 'root',
})
export class AuthtenticationGuard {
    private readonly router = inject(Router);

    private readonly authService = inject(AuthenticationService);
    private readonly userStateService = inject(UserStateService);

    public canActivate() {
        if (this.authService.getToken()) {
            const tokenInfo = this.getDecodedAccessToken(this.authService.getToken());
            const expireDate = tokenInfo.exp * 1000;

            if (new Date().getTime() > expireDate) {
                this.router.navigate(['/login']);
                return false;
            }

            this.userStateService.loadCurrentUser();
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    private getDecodedAccessToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch (Error) {
            return null;
        }
    }
}
