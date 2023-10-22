import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, tap, switchMap , throwError} from 'rxjs';
import { authservice } from '../services/auth/auth.service';

@Injectable()
export class ForumInterceptor implements HttpInterceptor {

  constructor(private authService:authservice) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('/admin')){ 
      const expToken = localStorage.getItem('adminToken')

      request = request.clone({
        setHeaders:{
          Authorization: expToken || ''
        }
      })
    }else{
      const expToken = localStorage.getItem('userToken')

      request = request.clone({
        setHeaders:{
          Authorization: expToken || ''
        }
      })
    }
    return next.handle(request).pipe(
      catchError((error) => {
        console.log('entered in pipie');
        
        if (error.status === 401) {
          // Access token expired, attempt to refresh it using the refresh token
          const refreshToken = localStorage.getItem('userRefresh');
          if (refreshToken) {
            return this.authService.updateToken(refreshToken).pipe(
              switchMap((data:any) => {
               console.log(data);
               
                const newAccessToken = data.token
                localStorage.setItem('userToken', newAccessToken);

                request = request.clone({
                  setHeaders: {
                    Authorization: newAccessToken || '',
                  },
                });

                return next.handle(request);
              }),
            );
          }
        }

        return throwError(error);
      }),
    );
  }
}
