import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {LoadingService} from '../services/LoadingService';
import {finalize} from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.show();
  console.log("loading")
  return next(req).pipe(
    finalize(() => {
      loadingService.hide();
    })
  );
};
