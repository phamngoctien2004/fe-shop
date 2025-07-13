import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("access_token");
  if(token != null){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Content_Type: 'application/json'
      }
    })
  }
  return next(req);
};
