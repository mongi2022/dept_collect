import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   // const token = localStorage.getItem('token')

    request = request.clone({
      withCredentials:true
    })

      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    

      request = request.clone({
        headers: request.headers.set('accept', 'application/json')
      });
     
    // if (token) {
    //   request = request.clone({
    //     headers: request.headers.set('Authorization', 'Bearer ' + token)
       
        
    //   });
    //   return next.handle(request).pipe(
    //     catchError((error: HttpErrorResponse) => {
    //       if (error && error.status === 401) {
    //         console.log("error unauthorized");
    //       }
    //       const err = error.error.message || error.statusText;
    //       return throwError(error)
    //     })
    //   )
    // }
    // else{
      return next.handle(request)
    // }
  }}
