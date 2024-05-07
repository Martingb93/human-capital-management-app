import { Injectable, inject } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { Credentials } from "../models";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthenticationStateService {
    public readonly authenticationApiService = inject(AuthenticationService);

    private readonly router = inject(Router);

    public login(credentials: Credentials): void {
        this.authenticationApiService.login(credentials).subscribe({
            next: response => {
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    this.router.navigate(['/dashboard']);
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: error => console.error('Encountered an error:', error),
        });
    }
}