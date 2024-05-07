import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';

import { Observable, catchError, of, take } from 'rxjs';
import { environment } from '../../../environment';

export interface QueryParams {
    [key: string]: string | number | boolean;
}

export abstract class BaseApi {
    protected abstract get controller(): string;

    private readonly httpClient = inject(HttpClient);

    protected get apiBaseUrl(): string {
        return environment.url;
    }

    private get url() {
        return `${this.apiBaseUrl}${this.controller}`;
    }

    protected get<T>(action: string, queryParams?: QueryParams, headers?: HttpHeaders): Observable<T> {
        const params = new HttpParams({ fromObject: queryParams });

        return this.httpClient.get<T>(`${this.url}/${action}`, { params, headers }).pipe(
            take(1),
            catchError(error => of(error)));
    }

    protected put<T>(queryParams?: QueryParams): Observable<T> {
        const params = new HttpParams({ fromObject: queryParams });

        return this.httpClient.put<T>(`${this.url}`, {}, { params }).pipe(
            take(1),
            catchError(error => of(error)));
    }

    protected post<Response, Input>(action: string, inputModel: Input = null, headers: HttpHeaders = null): Observable<Response> {
        return this.httpClient.post<Response>(`${this.url}/${action}`, inputModel, { headers }).pipe(
            take(1),
            catchError(error => {
                return of(error);
            })
        );
    }

    protected delete<T>(action: string, queryParams?: QueryParams): Observable<T> {
        const params = new HttpParams({ fromObject: queryParams });

        return this.httpClient.delete<T>(`${this.url}/${action}`, { params }).pipe(
            take(1),
            catchError(error => {
                return of(error);
            })
        );
    }
}
