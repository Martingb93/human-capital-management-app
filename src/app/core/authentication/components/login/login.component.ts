import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Credentials } from '@core/authentication/models';
import { AuthenticationService } from '@core/authentication/services';
import { AuthenticationStateService } from '@core/authentication/services/authentication-state.service';

@Component({
  selector: 'hcm-login',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public authenticationStateService = inject(AuthenticationStateService);
  
  public loginFormGroup = new FormGroup({
    username: new FormControl<string>(null, [Validators.required]),
    password: new FormControl<string>(null, [Validators.required]),
  });

  public login(): void {
    const credentials: Credentials = {
      username: this.loginFormGroup.controls['username'].value,
      password: this.loginFormGroup.controls['password'].value,
    };

    this.authenticationStateService.login(credentials);

    this.loginFormGroup.reset();
  }
}
