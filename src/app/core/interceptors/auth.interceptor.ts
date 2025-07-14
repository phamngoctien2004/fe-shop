import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const publicAPi: string[] = [
    '/auth/',
  ];
  const isPublic = publicAPi.some((prefixAPi)=> req.url.includes(prefixAPi))
  if(isPublic){
    console.log("a")
    return next(req);
  }

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
