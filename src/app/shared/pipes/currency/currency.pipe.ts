import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform, inject, computed } from '@angular/core';

@Pipe({
    name: 'hcmCurrency',
    standalone: true,
})
export class HcmCurrencyPipe implements PipeTransform {
    public decimalPipe = inject(DecimalPipe);

    public transform(value: number | string, currencySymbol: string) {
        return computed(() => {
            if (value !== null && value !== '') {
                const formatedValue = this.decimalPipe.transform(+value, '1.2-2');

                return currencySymbol + ' ' + formatedValue;
            }

            return '';
        })();
    }
}
