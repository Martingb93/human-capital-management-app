import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthtenticationGuard {
    private readonly router = inject(Router);

    private authService = inject(AuthenticationService);

    public canActivate() {
        if (this.authService.getToken()) {
            this.authService.validateToken().subscribe({
                next: () => {
                    this.authService.loadCurrentUser();
                    this.router.navigate(['/dashboard']);
                },
                error: error => {
                    console.error('Token validation failed:', error);
                    this.router.navigate(['/login']);
                },
            }
            );
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
