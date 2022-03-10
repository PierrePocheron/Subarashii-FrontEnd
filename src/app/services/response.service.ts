import { ToastService } from './toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { allTypeToast } from '../toast';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  constructor(private toatS: ToastService, private router: Router) {}

  ErrorF: any = (error: HttpErrorResponse) => {
    if (error.status == 0) {
      error.error.message = "Le serveur distant n'est pas joignable";
    }
    if (error.status == 404) {
      this.router.navigateByUrl('');
    }
    const toast = {
      isShow: true,
      message: error.message,
      type: allTypeToast.error,
    };

    this.toatS.activeToast(toast);
    return false;
  };

  SuccessF: any = (res: any) => {
    const toast = {
      isShow: true,
      message: res.message,
      type: allTypeToast.success,
    };

    this.toatS.activeToast(toast);
  };
}
