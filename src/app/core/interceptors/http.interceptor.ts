import {HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../services/AuthService';
import {Router} from '@angular/router';


export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = "lỗi không xác định";
      console.log(req)

      switch (error.status){
        case 429:
          const body = req.body as {email:string}
          authService.setEmailLocalStorage(body.email);
          router.navigate(['/login/verify'])
          break;
      }
      return throwError(() => error);
    })
  );
};
