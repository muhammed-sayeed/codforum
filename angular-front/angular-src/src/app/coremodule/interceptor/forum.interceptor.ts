import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ForumInterceptor implements HttpInterceptor {

  constructor() {}

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
    return next.handle(request)
  }
}
