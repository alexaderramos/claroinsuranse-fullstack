import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError, of, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthUtils } from '../auth/auth.utils';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Si el token está presente y no ha expirado, simplemente añade el encabezado Authorization
    if (this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken)) {
      req = this.addTokenHeader(req, this._authService.accessToken);
    }

    return next.handle(req).pipe(
      catchError(error => {
        // Si hay un error 401 y no es una petición de /auth/refresh
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          this._authService.accessToken &&
          ( !req.url.includes('/auth/refresh/') || !req.url.includes('/auth/') )
        ) {
          // Intenta usar el refreshToken para obtener un nuevo accessToken
          return this.handle401Error(req, next);
        }

        // Para otros tipos de errores, simplemente propaga el error.
        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._authService.signInUsingToken().pipe(
      switchMap(tokenRenewed => {
        if (tokenRenewed) {
          // Si el token fue renovado exitosamente, reintentar la petición original con el nuevo token
          return next.handle(this.addTokenHeader(req, this._authService.accessToken));
        } else {
          // Si no se pudo renovar el token, cerrar sesión y recargar la página
          this._authService.logout().subscribe(() => {
            location.reload();
          });

          return throwError(() => new Error('Failed to renew token'));
        }
      }),
      catchError((err) => {
        // Si ocurre un error durante la renovación del token, cerrar sesión y recargar la página
        this._authService.logout().subscribe(() => {
          location.reload();
        });
        return throwError(() => err);
      })
    );
  }

  private addTokenHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    // Añade el encabezado Authorization con el token
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }
}
