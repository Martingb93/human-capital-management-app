import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    public static numberIsInteger(control: AbstractControl): ValidationErrors | null {
        return control.value % 1 != 0 ? { integer: true } : null;
    }
}
