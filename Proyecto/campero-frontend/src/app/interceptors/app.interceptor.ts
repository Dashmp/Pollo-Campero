import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize, delay } from 'rxjs';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);

    // 1. ACTIVAR PANTALLA DE CARGA
    loadingService.show();

    // 2. INYECTAR TOKEN DE SEGURIDAD (HTTP INTERCEPTOR)
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

    let authReq = req;
    if (token) {
        authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }

    // 3. ENVIAR PETICIÓN Y APAGAR CARGA AL TERMINAR
    return next(authReq).pipe(
        delay(500), // Retraso artificial de 0.5s para que la animación de carga se note
        finalize(() => {
            loadingService.hide();
        })
    );
};